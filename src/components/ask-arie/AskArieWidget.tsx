"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, Copy, MessageCircle, RotateCcw, Send, X } from "lucide-react";
import {
  askArie,
  ChatMessage,
  checkAskArieHealth,
  createAssistantMessageFromApiResponse,
  generateMessageId,
} from "@/lib/ask-arie";
import { MarkdownRenderer } from "./MarkdownRenderer";

interface AskArieWidgetProps {
  initialMessages?: ChatMessage[];
}

const STARTER_QUESTIONS = [
  "How do I get started building on ar.io?",
  "What's the easiest way to upload or fetch data?",
  "How do I register a domain for my app with ArNS?",
];

const ASK_ARIE_THREAD_ID_KEY = "ask-arie-thread-id";
const ASK_ARIE_MESSAGES_KEY = "ask-arie-messages";

export function AskArieWidget({ initialMessages = [] }: AskArieWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const [threadId, setThreadId] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();
  const [avatarSrc, setAvatarSrc] = useState("/brand/ask-arie.png");

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesScrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setAvatarSrc(resolvedTheme === "dark" ? "/brand/ask-arie-dark.png" : "/brand/ask-arie.png");
  }, [resolvedTheme]);

  useEffect(() => {
    if (!mounted) return;

    try {
      const savedThreadId = sessionStorage.getItem(ASK_ARIE_THREAD_ID_KEY);
      if (savedThreadId) setThreadId(savedThreadId);

      const savedMessages = sessionStorage.getItem(ASK_ARIE_MESSAGES_KEY);
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages);
        if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
          setMessages(parsedMessages);
        }
      }
    } catch (hydrateError) {
      console.warn("Failed to hydrate Ask Arie state from sessionStorage:", hydrateError);
      sessionStorage.removeItem(ASK_ARIE_THREAD_ID_KEY);
      sessionStorage.removeItem(ASK_ARIE_MESSAGES_KEY);
    }
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    if (threadId) {
      sessionStorage.setItem(ASK_ARIE_THREAD_ID_KEY, threadId);
    } else {
      sessionStorage.removeItem(ASK_ARIE_THREAD_ID_KEY);
    }
  }, [threadId, mounted]);

  useEffect(() => {
    if (!mounted) return;

    try {
      const messagesToSave = messages.slice(-50);
      if (messagesToSave.length > 0) {
        sessionStorage.setItem(ASK_ARIE_MESSAGES_KEY, JSON.stringify(messagesToSave));
      } else {
        sessionStorage.removeItem(ASK_ARIE_MESSAGES_KEY);
      }
    } catch (persistError) {
      console.warn("Failed to persist Ask Arie messages to sessionStorage:", persistError);
    }
  }, [messages, mounted]);

  useEffect(() => {
    if (!mounted) return;

    const checkHealth = async () => {
      const healthy = await checkAskArieHealth();
      if (healthy) {
        window.setTimeout(() => setIsHealthy(true), 1500);
      } else {
        setIsHealthy(false);
      }
    };

    checkHealth();
  }, [mounted]);

  useEffect(() => {
    const el = messagesScrollRef.current;
    if (!el) return;

    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    const isNearBottom = distanceFromBottom < 140;
    if (!isNearBottom) return;

    const id = window.setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 50);

    return () => window.clearTimeout(id);
  }, [messages, isLoading]);

  const openChat = useCallback(() => {
    setIsOpen(true);
    setTimeout(() => setIsVisible(true), 50);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const closeChat = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => setIsOpen(false), 200);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeChat();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeChat]);

  useEffect(() => {
    if (!isOpen) return;

    const isSmallScreen = window.matchMedia("(max-width: 640px)").matches;
    if (!isSmallScreen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const handleCopyMessage = useCallback(async (messageId: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = content;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);

      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    }
  }, []);

  const sendMessage = useCallback(
    async (question: string) => {
      setError(null);
      setIsLoading(true);

      const userMessageId = generateMessageId();
      const userMessage: ChatMessage = {
        id: userMessageId,
        role: "user",
        content: question,
        createdAt: Date.now(),
      };

      setMessages((prev) => [...prev, userMessage]);

      try {
        const response = await askArie(question, threadId);
        if (response.thread_id) setThreadId(response.thread_id);

        const assistantMessageId = generateMessageId();
        const assistantMessage = createAssistantMessageFromApiResponse(
          response,
          assistantMessageId
        );

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (e) {
        const message = e instanceof Error ? e.message : "Unknown error";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [threadId]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const question = inputValue.trim();
      if (!question || isLoading) return;
      setInputValue("");
      await sendMessage(question);
    },
    [inputValue, isLoading, sendMessage]
  );

  const handleNewChat = useCallback(() => {
    setMessages([]);
    setThreadId(null);
    setInputValue("");
    setError(null);
    sessionStorage.removeItem(ASK_ARIE_THREAD_ID_KEY);
    sessionStorage.removeItem(ASK_ARIE_MESSAGES_KEY);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const floatingButton =
    isHealthy === true ? (
      <button
        type="button"
        onClick={openChat}
        className="group fixed bottom-4 right-4 z-50 inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-fd-primary text-fd-background shadow-lg hover:bg-fd-primary/90 hover:scale-110 active:scale-95 transition-transform duration-150 ease-out"
        aria-label="Open chat"
      >
        <MessageCircle className="size-6 transition-transform duration-150 ease-out group-hover:rotate-[15deg]" />
      </button>
    ) : null;

  const chatModal =
    mounted && isOpen ? (
      <div
        className="fixed inset-0 z-[60] flex items-stretch justify-center p-0 sm:items-center sm:p-4"
        role="dialog"
        aria-modal="true"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) closeChat();
        }}
      >
        <button
          type="button"
          onClick={closeChat}
          className="absolute inset-0 cursor-pointer border-0 p-0 bg-black/40 backdrop-blur-[1px]"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 200ms ease-out",
          }}
          aria-label="Close chat"
        />

        <div
          className="relative flex h-full w-full flex-col overflow-hidden rounded-none border-0 border-fd-border bg-fd-background shadow-2xl sm:h-auto sm:min-h-[420px] sm:max-w-2xl sm:rounded-2xl sm:border"
          style={{
            transform: isVisible ? "translateY(0)" : "translateY(10px)",
            opacity: isVisible ? 1 : 0,
            transition: "all 200ms ease-out",
          }}
        >
          <div className="flex items-center justify-between border-b border-fd-border px-4 py-2">
            <div className="flex items-center gap-4">
              <div className="size-14 overflow-hidden rounded-full shrink-0">
                <Image
                  src={avatarSrc}
                  alt="Ask Arie"
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="text-lg font-semibold text-fd-foreground leading-tight">Ask Arie (beta)</div>
                <div className="text-base text-fd-muted-foreground leading-tight">I'm here to help you build!</div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleNewChat}
                className="inline-flex size-10 cursor-pointer items-center justify-center rounded-md text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground transition-colors"
                aria-label="New chat"
              >
                <RotateCcw className="size-5" />
              </button>
              <button
                type="button"
                onClick={closeChat}
                className="inline-flex size-10 cursor-pointer items-center justify-center rounded-md text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground transition-colors"
                aria-label="Close chat"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          <div ref={messagesScrollRef} className="min-h-[280px] max-h-full flex-1 overflow-y-auto p-4 space-y-3 sm:max-h-[60vh]">
            {messages.length === 0 && !isLoading && !error && (
              <div className="space-y-3">
                <p className="text-sm text-fd-muted-foreground">Try one of these to get started:</p>
                <div className="flex flex-col gap-2">
                  {STARTER_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => sendMessage(q)}
                      className="cursor-pointer rounded-lg border border-fd-border bg-fd-background px-3 py-2 text-left text-sm text-fd-foreground hover:bg-fd-accent transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="max-w-[85%]">
                  <div
                    className={`rounded-lg px-3 py-2 text-sm ${
                      message.role === "user"
                        ? "bg-fd-primary text-fd-background"
                        : "bg-fd-card border border-fd-border text-fd-foreground"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <>
                        <MarkdownRenderer text={message.content} messageId={message.id} />

                        {message.meta?.citations && message.meta.citations.length > 0 && (
                          <details className="mt-3">
                            <summary className="cursor-pointer text-xs text-fd-muted-foreground hover:text-fd-foreground">
                              Sources ({message.meta.citations.length})
                            </summary>
                            <div className="mt-2 rounded-md border border-fd-border bg-fd-background p-3">
                              {Array.isArray(message.meta.sourcesUsed) &&
                                message.meta.sourcesUsed.length > 0 && (
                                  <div className="mb-2 text-xs text-fd-muted-foreground">
                                    Sources used: {message.meta.sourcesUsed.join(", ")}
                                  </div>
                                )}
                              <ol className="list-decimal list-inside space-y-1 text-xs">
                                {message.meta.citations.map((citation) => (
                                  <li
                                    key={citation.index}
                                    id={`arie-citation-${message.id}-${citation.index}`}
                                  >
                                    {citation.url ? (
                                      <a
                                        href={citation.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="cursor-pointer text-fd-primary underline underline-offset-2 hover:opacity-80"
                                      >
                                        {citation.title}
                                      </a>
                                    ) : (
                                      citation.title
                                    )}
                                  </li>
                                ))}
                              </ol>
                            </div>
                          </details>
                        )}

                        <div className="mt-2 flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleCopyMessage(message.id, message.content)}
                            className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-xs text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground transition-colors"
                            aria-label="Copy message"
                          >
                            {copiedMessageId === message.id ? (
                              <>
                                <Check className="size-3" />
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy className="size-3" />
                                Copy
                              </>
                            )}
                          </button>
                        </div>
                      </>
                    ) : (
                      <span>{message.content}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="w-full rounded-lg bg-fd-card border border-fd-border px-3 py-2 text-sm text-fd-foreground">
                  <div className="flex items-center gap-2">
                    <div className="size-4 border-2 border-fd-primary border-t-transparent rounded-full animate-spin" />
                    <span className="text-fd-muted-foreground">Thinking...</span>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="flex justify-start">
                <div className="w-full rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-800">
                  <p className="font-medium mb-1">Unable to get response</p>
                  <p className="text-xs mb-2">{error}</p>
                  <button
                    type="button"
                    onClick={() => setError(null)}
                    className="cursor-pointer text-xs underline hover:no-underline"
                  >
                    Try again
                  </button>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="flex-shrink-0 border-t border-fd-border p-4">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about ar.io..."
                disabled={isLoading}
                className="flex-1 rounded-lg border border-fd-border bg-fd-background px-3 py-2 text-sm text-fd-foreground placeholder:text-fd-muted-foreground focus:border-fd-primary focus:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="inline-flex size-10 items-center justify-center rounded-lg bg-fd-primary text-fd-background hover:bg-fd-primary/90 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 ease-out"
                aria-label="Send message"
              >
                <Send
                  className={`size-4 transition-transform duration-150 ease-out ${
                    isLoading ? "animate-pulse" : ""
                  }`}
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    ) : null;

  return (
    <>
      {floatingButton}
      {mounted && typeof document !== "undefined" ? createPortal(chatModal, document.body) : null}
    </>
  );
}

