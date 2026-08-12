-- Replace has_role() usage in policies with a self-scoped EXISTS on user_roles
DROP POLICY IF EXISTS tools_admin_read ON public.tools;
DROP POLICY IF EXISTS tools_admin_insert ON public.tools;
DROP POLICY IF EXISTS tools_admin_update ON public.tools;
DROP POLICY IF EXISTS tools_admin_delete ON public.tools;
DROP POLICY IF EXISTS blog_admin_read ON public.blog_posts;
DROP POLICY IF EXISTS blog_admin_insert ON public.blog_posts;
DROP POLICY IF EXISTS blog_admin_update ON public.blog_posts;
DROP POLICY IF EXISTS blog_admin_delete ON public.blog_posts;

CREATE POLICY tools_admin_read ON public.tools FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::app_role));
CREATE POLICY tools_admin_insert ON public.tools FOR INSERT TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::app_role));
CREATE POLICY tools_admin_update ON public.tools FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::app_role))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::app_role));
CREATE POLICY tools_admin_delete ON public.tools FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::app_role));

CREATE POLICY blog_admin_read ON public.blog_posts FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::app_role));
CREATE POLICY blog_admin_insert ON public.blog_posts FOR INSERT TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::app_role));
CREATE POLICY blog_admin_update ON public.blog_posts FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::app_role))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::app_role));
CREATE POLICY blog_admin_delete ON public.blog_posts FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::app_role));

-- Signed-in users may no longer execute the SECURITY DEFINER helper
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM authenticated, anon, public;