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

interface AtsReportProps {
  score?: number
  scoreLabel?: string
  summary?: string
  quickWins?: string[]
  reportUrl?: string
}

export function AtsReportEmail({
  score = 72,
  scoreLabel = 'Good',
  summary = 'Your resume is readable by most ATS parsers but is missing measurable results.',
  quickWins = [],
  reportUrl = 'https://zenwrit.com/check',
}: AtsReportProps) {
  return (
    <Html>
      <Head />
      <Preview>{`Your ATS score: ${score}/100 (${scoreLabel})`}</Preview>
      <Body style={{ backgroundColor: '#f6f7f9', fontFamily: "'DM Sans',Helvetica,Arial,sans-serif", margin: 0 }}>
        <Container style={{ backgroundColor: '#ffffff', borderRadius: 12, margin: '32px auto', maxWidth: 560, padding: '32px 28px' }}>
          <Heading style={{ color: '#111827', fontSize: 22, margin: '0 0 8px' }}>
            Your ATS score: {score}/100 — {scoreLabel}
          </Heading>
          <Text style={{ color: '#374151', fontSize: 15, lineHeight: '1.6', margin: '0 0 20px' }}>
            {summary}
          </Text>
          {quickWins.length ? (
            <Section style={{ margin: '0 0 20px' }}>
              <Text style={{ color: '#111827', fontSize: 15, fontWeight: 600, margin: '0 0 8px' }}>
                Fix these first
              </Text>
              {quickWins.slice(0, 3).map((win, index) => (
                <Text key={index} style={{ color: '#374151', fontSize: 14, lineHeight: '1.6', margin: '0 0 6px' }}>
                  {index + 1}. {win}
                </Text>
              ))}
            </Section>
          ) : null}
          <Section style={{ margin: '24px 0' }}>
            <Button
              href={reportUrl}
              style={{ backgroundColor: '#2563eb', borderRadius: 8, color: '#ffffff', display: 'inline-block', fontWeight: 600, padding: '12px 20px', textDecoration: 'none' }}
            >
              View your full report
            </Button>
          </Section>
          <Text style={{ color: '#6b7280', fontSize: 13, lineHeight: '1.6', margin: 0 }}>
            Your resume file is never stored — only this report was saved so you could share it.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: AtsReportEmail,
  subject: (data: Record<string, any>) => `Your ATS score: ${data['score'] ?? ''}/100`,
  displayName: 'ATS report',
  previewData: {
    score: 72,
    scoreLabel: 'Good',
    summary: 'Your resume is readable by most ATS parsers but is missing measurable results.',
    quickWins: ['Add metrics to your top 3 bullets', 'Add a skills section', 'Shorten bullets to 2 lines'],
    reportUrl: 'https://zenwrit.com/check',
  },
} satisfies TemplateEntry
