import type { ComponentType } from 'react'
import { template as proWelcomeTemplate } from './pro-welcome'
import { template as paymentFailedTemplate } from './payment-failed'
import { template as atsReportTemplate } from './ats-report'

export interface TemplateEntry {
  component: ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  displayName?: string
  previewData?: Record<string, any>
  /** Fixed recipient — overrides caller-provided recipientEmail when set. */
  to?: string
}

/**
 * Template registry — maps template names to their React Email components.
 * Import and register new templates here after creating them in this directory.
 *
 * Example:
 *   import { template as welcomeTemplate } from './welcome'
 *   // then add to TEMPLATES: 'welcome': welcomeTemplate
 */
export const TEMPLATES: Record<string, TemplateEntry> = {
  'pro-welcome': proWelcomeTemplate,
  'payment-failed': paymentFailedTemplate,
  'ats-report': atsReportTemplate,
}
