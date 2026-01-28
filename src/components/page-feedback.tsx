"use client";

import { Feedback } from "@/components/feedback";

interface PageFeedbackProps {
  pageUrl: string;
}

interface FeedbackData {
  opinion: "good" | "bad";
  message?: string;
}

async function handleFeedback(pageUrl: string, feedback: FeedbackData) {
  try {
    // Web3Forms configuration - Public access key for ar.io Documentation feedback
    const WEB3FORMS_ACCESS_KEY = "88dab14e-e2f1-47cc-b284-84496d1ddc59";
    const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

    const formData = new FormData();
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);

    // Format the subject for easy email filtering
    const feedbackType =
      feedback.opinion === "good" ? "✅ POSITIVE" : "❌ NEGATIVE";
    const subject = `[ar.io Docs] ${feedbackType} Feedback - ${pageUrl}`;
    formData.append("subject", subject);
    formData.append("from_name", "ar.io Documentation Feedback");

    // Create a well-formatted email body
    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "UTC",
      dateStyle: "medium",
      timeStyle: "medium",
    });

    const sentiment =
      feedback.opinion === "good" ? "👍 Positive" : "👎 Negative";

    const message = `
Documentation Feedback Report
=============================

Page URL: ${pageUrl}
Sentiment: ${sentiment}
Timestamp: ${timestamp} UTC

User Feedback:
--------------
${feedback.message || "No additional comments provided."}

---
This feedback was submitted through the ar.io Documentation site.
To improve our docs, please consider opening an issue on GitHub.
    `.trim();

    formData.append("message", message);

    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Web3Forms API error: ${res.status}`);
    }

    // Generate a pre-filled GitHub issue URL
    const issueTitle = `[Docs Feedback] ${feedback.opinion === "good" ? "Positive" : "Improvement needed"} - ${pageUrl}`;

    const issueBody = `
## Documentation Feedback

**Page URL:** ${pageUrl}
**Sentiment:** ${feedback.opinion === "good" ? "👍 Positive" : "👎 Needs Improvement"}

### User Feedback
${feedback.message}

### Context
- **Source file:** \`${pageUrl}\`
- **Live URL:** ${pageUrl}
- **Submitted via:** Documentation feedback widget

---
*This issue was created from user feedback on the documentation site.*
    `.trim();

    const params = new URLSearchParams({
      title: issueTitle,
      body: issueBody,
      labels: "documentation,feedback",
    });

    return {
      githubUrl: `https://github.com/ar-io/docs/issues/new?${params.toString()}`,
    };
  } catch (error) {
    console.error("[Feedback] Failed to submit:", error);
    // Return generic issues page as fallback
    return {
      githubUrl: "https://github.com/ar-io/docs/issues",
    };
  }
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
