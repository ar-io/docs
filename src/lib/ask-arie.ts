/**
 * Ask Arie - ar.io Docs Chat Widget
 *
 * API integration and types for the Ask Arie widget.
 * Uses external API: https://sparklechat-3bzk.onrender.com/technical/ask
 */

export interface HealthEndpoint {
  path: string;
  method: string;
  status: string;
}

export interface HealthCheckResponse {
  status: "ok" | "error";
  chat_available?: boolean;
  duckdb_available?: boolean;
  openai_available?: boolean;
  live_pricing_available?: boolean;
  endpoints: HealthEndpoint[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: number;
  meta?: {
    citations?: Citation[];
    sourcesUsed?: number[];
    chunkCount?: number;
  };
}

export interface Citation {
  index: number;
  title: string;
  url: string;
  raw: string;
}

export interface ArieApiRequest {
  question: string;
  thread_id?: string;
}

export interface ArieApiResponse {
  answer: string;
  citations: string[];
  sources_used: number[];
  chunk_count: number;
  thread_id: string;
  message_id: string;
  parent_message_id: string | null;
}

export interface AccessCheckResponse {
  allowed: boolean;
  reason?: string;
}

const TECHNICAL_ASK_ENDPOINT = "https://sparklechat-3bzk.onrender.com/technical/ask";
const HEALTH_ENDPOINT = "https://sparklechat-3bzk.onrender.com/health";
const ACCESS_CHECK_ENDPOINT =
  "https://sparklechat-3bzk.onrender.com/access-check?resource=technical_ask";

export async function askArie(
  question: string,
  threadId?: string | null
): Promise<ArieApiResponse> {
  const currentPageUrl = window.location.href;
  const currentPageTitle = document.title;
  const contextualQuestion = `[Page: ${currentPageTitle}]\n[${currentPageUrl}]\n\n${question}`;

  const payload: ArieApiRequest = { question: contextualQuestion };
  if (threadId) payload.thread_id = threadId;

  let response: Response;
  try {
    response = await fetch(TECHNICAL_ASK_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (fetchError) {
    const isCorsError =
      fetchError instanceof TypeError &&
      (fetchError.message.includes("Failed to fetch") ||
        fetchError.message.includes("NetworkError"));

    if (!isCorsError) throw fetchError;

    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(TECHNICAL_ASK_ENDPOINT)}`;
    try {
      response = await fetch(proxyUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      throw new Error(
        "CORS error: The Ask Arie API needs to allow requests from this domain. " +
          "Please contact the API maintainer to add CORS headers for this origin."
      );
    }
  }

  if (!response.ok && response.status === 0) {
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(TECHNICAL_ASK_ENDPOINT)}`;
    try {
      response = await fetch(proxyUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      throw new Error(
        "CORS error: The Ask Arie API needs to allow requests from this domain. " +
          "Please contact the API maintainer to add CORS headers for this origin."
      );
    }
  }

  if (!response.ok) {
    let errorMessage = "Failed to get response from Ask Arie service";
    try {
      const errorBody = await response.text();
      if (errorBody) errorMessage = `Ask Arie service error: ${errorBody}`;
    } catch {
      errorMessage = `Ask Arie service error (${response.status}): ${response.statusText}`;
    }
    throw new Error(errorMessage);
  }

  const data: ArieApiResponse = await response.json();
  if (typeof data.answer !== "string") {
    throw new Error("Ask Arie service returned an invalid response");
  }
  return data;
}

export function parseCitationMarkdownLink(rawCitation: string): Citation | null {
  const trimmed = rawCitation.trim();
  const angleMatch = trimmed.match(/^\[([^\]]+)\]\(<([^>]+)>\)$/);
  const normalMatch = trimmed.match(/^\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]+)")?\)$/);
  const match = angleMatch ?? normalMatch;
  if (!match) return null;

  const title = match[1].trim();
  const url = (angleMatch ? angleMatch[2] : match[2])?.trim() ?? "";
  return { index: 0, title, url, raw: rawCitation };
}

export function createAssistantMessageFromApiResponse(
  response: ArieApiResponse,
  messageId: string
): ChatMessage {
  const citations: Citation[] = response.citations
    .map((citationStr, index) => {
      const parsed = parseCitationMarkdownLink(citationStr);
      if (parsed) return { ...parsed, index: index + 1 };
      return { index: index + 1, title: citationStr, url: "", raw: citationStr };
    })
    .filter((citation) => citation.title.trim() !== "");

  return {
    id: messageId,
    role: "assistant",
    content: response.answer,
    createdAt: Date.now(),
    meta: {
      citations,
      sourcesUsed: response.sources_used,
      chunkCount: response.chunk_count,
    },
  };
}

export function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export async function checkTechnicalAccess(): Promise<boolean> {
  try {
    const response = await fetch(ACCESS_CHECK_ENDPOINT, {
      method: "GET",
      headers: { Origin: window.location.origin },
    });
    if (!response.ok) return false;
    const data: AccessCheckResponse = await response.json();
    return data.allowed === true;
  } catch {
    return false;
  }
}

/** Payload for the Ask Arie open event. */
export interface AskArieOpenDetail {
  question: string;
  /** If true, start a new chat and send the question immediately. */
  autoSend?: boolean;
}

/** Custom event name to open the Ask Arie widget (detail: AskArieOpenDetail). */
export const ASK_ARIE_OPEN_EVENT = "ask-arie-open";

export async function checkAskArieHealth(): Promise<boolean> {
  try {
    const response = await fetch(HEALTH_ENDPOINT, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) return false;

    const data: HealthCheckResponse = await response.json();
    const serviceOk = data.status === "ok";
    const chatAvailable = data.chat_available === true;

    const technicalEndpoint = data.endpoints?.find(
      (ep) => ep.path === "/technical/ask" && ep.method === "POST"
    );
    const endpointReady = technicalEndpoint?.status === "registered";

    if (!(serviceOk && chatAvailable && endpointReady)) return false;
    return (await checkTechnicalAccess()) === true;
  } catch {
    return false;
  }
}

