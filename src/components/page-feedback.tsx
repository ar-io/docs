"use client";

import {
  Feedback,
  type ActionResponse,
  type Feedback as FeedbackData,
} from "@/components/feedback";

export function PageFeedback({ pageUrl }: { pageUrl: string }) {
  async function onRateAction(
    pathname: string,
    feedbackData: FeedbackData,
  ): Promise<ActionResponse> {
    const body = [
      `**Page URL:** ${pageUrl}`,
      `**Pathname:** ${pathname}`,
      `**Rating:** ${feedbackData.opinion}`,
      "",
      feedbackData.message,
    ].join("\n");

    const params = new URLSearchParams({
      title: `Docs feedback: ${pageUrl}`,
      body,
    });

    return {
      githubUrl: `https://github.com/ar-io/docs/issues/new?${params.toString()}`,
    };
  }

  return <Feedback onRateAction={onRateAction} />;
}
