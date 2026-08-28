CREATE TABLE public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  subscribed_at timestamptz NOT NULL DEFAULT now(),
  source text NOT NULL DEFAULT 'blog_post',
  is_active boolean NOT NULL DEFAULT true
);
GRANT ALL ON public.newsletter_subscribers TO service_role;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.article_ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_slug text NOT NULL,
  rating smallint NOT NULL CHECK (rating BETWEEN 1 AND 5),
  user_ip text NOT NULL DEFAULT 'unknown',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (post_slug, user_ip)
);
CREATE INDEX article_ratings_slug_idx ON public.article_ratings (post_slug);
GRANT ALL ON public.article_ratings TO service_role;
ALTER TABLE public.article_ratings ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.article_rating_summary(_slug text)
RETURNS TABLE (avg_rating numeric, rating_count bigint)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(ROUND(AVG(rating)::numeric, 1), 0), COUNT(*)
  FROM public.article_ratings WHERE post_slug = _slug;
$$;
GRANT EXECUTE ON FUNCTION public.article_rating_summary(text) TO anon, authenticated, service_role;