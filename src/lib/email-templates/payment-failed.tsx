import * as React from 'react'
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface PaymentFailedProps {
  siteUrl?: string
}

export function PaymentFailedEmail({ siteUrl = 'https://zenwrit.com' }: PaymentFailedProps) {
  return (
    <Html>
      <Head />
      <Preview>We couldn't take your ZenWrit Pro payment</Preview>
      <Body style={{ backgroundColor: '#f6f7f9', fontFamily: "'DM Sans',Helvetica,Arial,sans-serif", margin: 0 }}>
        <Container style={{ backgroundColor: '#ffffff', borderRadius: 12, margin: '32px auto', maxWidth: 520, padding: '32px 28px' }}>
          <Heading style={{ color: '#111827', fontSize: 22, margin: '0 0 12px' }}>
            Your last payment didn't go through
          </Heading>
          <Text style={{ color: '#374151', fontSize: 15, lineHeight: '1.6', margin: '0 0 16px' }}>
            We couldn't charge your card for ZenWrit Pro. We'll retry automatically over the next
            few days, but updating your payment details now is the quickest way to keep unlimited
            generations switched on.
          </Text>
          <Section style={{ margin: '24px 0' }}>
            <Button
              href={`${siteUrl}/dashboard`}
              style={{ backgroundColor: '#2563eb', borderRadius: 8, color: '#ffffff', display: 'inline-block', fontWeight: 600, padding: '12px 20px', textDecoration: 'none' }}
            >
              Update payment method
            </Button>
          </Section>
          <Text style={{ color: '#6b7280', fontSize: 13, lineHeight: '1.6', margin: 0 }}>
            Open your dashboard at {siteUrl}/dashboard and choose "Manage billing". Payments are
            handled by Paddle, our merchant of record.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: PaymentFailedEmail,
  subject: 'Action needed: your ZenWrit Pro payment failed',
  displayName: 'Payment failed',
  previewData: { siteUrl: 'https://zenwrit.com' },
} satisfies TemplateEntry
