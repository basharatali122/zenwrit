CREATE TABLE public.ats_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  share_id TEXT NOT NULL UNIQUE,
  report JSONB NOT NULL,
  has_job_description BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT ALL ON public.ats_reports TO service_role;
ALTER TABLE public.ats_reports ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.contact_emails (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'ats-resume-checker',
  report_share_id TEXT,
  marketing_consent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT ALL ON public.contact_emails TO service_role;
ALTER TABLE public.contact_emails ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_ats_reports_share_id ON public.ats_reports (share_id);
CREATE INDEX idx_contact_emails_email ON public.contact_emails (email);