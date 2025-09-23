'use client';

import { Feedback } from '@/components/feedback';
import { handleFeedback } from '@/app/[[...slug]]/feedback-action';

interface PageFeedbackProps {
  pageUrl: string;
}

export function PageFeedback({ pageUrl }: PageFeedbackProps) {
  return (
    <Feedback 
      onRateAction={async (_, feedback) => {
        return await handleFeedback(pageUrl, feedback);
      }} 
    />
  );
}