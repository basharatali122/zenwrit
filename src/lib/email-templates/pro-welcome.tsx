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

interface ProWelcomeProps {
  yearly?: boolean
  siteUrl?: string
}

export function ProWelcomeEmail({
  yearly = false,
  siteUrl = 'https://zenwrit.com',
}: ProWelcomeProps) {
  return (
    <Html>
      <Head />
      <Preview>Your ZenWrit Pro subscription is active</Preview>
      <Body style={{ backgroundColor: '#f6f7f9', fontFamily: "'DM Sans',Helvetica,Arial,sans-serif", margin: 0 }}>
        <Container style={{ backgroundColor: '#ffffff', borderRadius: 12, margin: '32px auto', maxWidth: 520, padding: '32px 28px' }}>
          <Heading style={{ color: '#111827', fontSize: 22, margin: '0 0 12px' }}>
            Welcome to ZenWrit Pro
          </Heading>
          <Text style={{ color: '#374151', fontSize: 15, lineHeight: '1.6', margin: '0 0 16px' }}>
            Your {yearly ? 'yearly' : 'monthly'} Pro subscription is active. You now have unlimited
            generations, no ads, and our most advanced AI model on every tool.
          </Text>
          <Section style={{ margin: '24px 0' }}>
            <Button
              href={`${siteUrl}/tools`}
              style={{ backgroundColor: '#2563eb', borderRadius: 8, color: '#ffffff', display: 'inline-block', fontWeight: 600, padding: '12px 20px', textDecoration: 'none' }}
            >
              Start generating
            </Button>
          </Section>
          <Text style={{ color: '#6b7280', fontSize: 13, lineHeight: '1.6', margin: 0 }}>
            Manage or cancel your plan anytime from your dashboard at {siteUrl}/dashboard. Payments
            are handled by Paddle, our merchant of record.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: ProWelcomeEmail,
  subject: 'Welcome to ZenWrit Pro',
  displayName: 'Pro welcome',
  previewData: { yearly: false, siteUrl: 'https://zenwrit.com' },
} satisfies TemplateEntry
