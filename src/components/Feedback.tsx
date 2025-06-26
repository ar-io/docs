'use client'

import { forwardRef, useState } from 'react'
import { Transition } from '@headlessui/react'
import clsx from 'clsx'
import { FeedbackModal } from './FeedbackModal'

function CheckIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <circle cx="10" cy="10" r="10" strokeWidth="0" />
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m6.75 10.813 2.438 2.437c1.218-4.469 4.062-6.5 4.062-6.5"
      />
    </svg>
  )
}

function FeedbackButton(
  props: Omit<React.ComponentPropsWithoutRef<'button'>, 'type' | 'className'>,
) {
  return (
    <button
      type="submit"
      className="px-3 text-sm font-medium text-zinc-600 transition hover:bg-zinc-900/2.5 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"
      {...props}
    />
  )
}

const FeedbackForm = forwardRef<
  React.ElementRef<'form'>,
  React.ComponentPropsWithoutRef<'form'> & { onCommentClick: () => void }
>(function FeedbackForm(
  { onSubmit, onCommentClick, className, ...props },
  ref,
) {
  return (
    <form
      {...props}
      ref={ref}
      onSubmit={onSubmit}
      className={clsx(
        className,
        'absolute inset-0 flex items-center justify-center gap-6 md:justify-start',
      )}
    >
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Was this page helpful?
      </p>
      <div className="group grid h-8 grid-cols-[1fr,1px,1fr,1px,1fr] overflow-hidden rounded-full border border-zinc-900/10 dark:border-white/10">
        <FeedbackButton data-response="yes">Yes</FeedbackButton>
        <div className="bg-zinc-900/10 dark:bg-white/10" />
        <FeedbackButton data-response="no">No</FeedbackButton>
        <div className="bg-zinc-900/10 dark:bg-white/10" />
        <button
          type="button"
          onClick={onCommentClick}
          className="px-3 text-sm font-medium text-zinc-600 transition hover:bg-zinc-900/2.5 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"
        >
          Comment
        </button>
      </div>
    </form>
  )
})

const FeedbackThanks = forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>(function FeedbackThanks({ className, ...props }, ref) {
  return (
    <div
      {...props}
      ref={ref}
      className={clsx(
        className,
        'absolute inset-0 flex justify-center md:justify-start',
      )}
    >
      <div className="flex items-center gap-3 rounded-full bg-emerald-50/50 py-1 pl-1.5 pr-3 text-sm text-emerald-900 ring-1 ring-inset ring-emerald-500/20 dark:bg-emerald-500/5 dark:text-emerald-200 dark:ring-emerald-500/30">
        <CheckIcon className="h-5 w-5 flex-none fill-emerald-500 stroke-white dark:fill-emerald-200/20 dark:stroke-emerald-200" />
        Thanks for your feedback!
      </div>
    </div>
  )
})

async function sendFeedback(response: string, url: string, comment?: string) {
  try {
    // Web3Forms access key - safe to be public
    const WEB3FORMS_ACCESS_KEY = '88dab14e-e2f1-47cc-b284-84496d1ddc59'

    const formData = new FormData()
    formData.append('access_key', WEB3FORMS_ACCESS_KEY)

    // Create subject with yes/no and comment indicator for filtering
    const subject = comment
      ? `Documentation Feedback - ${response.toUpperCase()} [Comment]`
      : `Documentation Feedback - ${response.toUpperCase()}`
    formData.append('subject', subject)

    formData.append('from_name', 'AR.IO Documentation')

    let message = `
New feedback received for ar.io documentation:

Response: ${response.toUpperCase()}
Page URL: ${url}
Timestamp: ${new Date().toISOString()}
User Agent: ${typeof window !== 'undefined' ? window.navigator.userAgent : 'Unknown'}`

    if (comment) {
      message += `\n\nDetailed Comment:\n${comment}`
    }

    formData.append('message', message.trim())

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    })

    if (res.ok) {
      console.log('Feedback sent successfully')
    } else {
      throw new Error('Failed to send feedback')
    }
  } catch (error) {
    console.error('Failed to send feedback:', error)
    // Don't show error to user to keep UX smooth
  }
}

export function Feedback() {
  let [submitted, setSubmitted] = useState(false)
  let [modalOpen, setModalOpen] = useState(false)

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const submitter = (event.nativeEvent as any).submitter
    const response = submitter?.dataset?.response || 'unknown'
    const currentUrl =
      typeof window !== 'undefined' ? window.location.href : 'Unknown'

    // Send feedback in the background
    sendFeedback(response, currentUrl)

    setSubmitted(true)
  }

  function onCommentClick() {
    setModalOpen(true)
  }

  async function onModalSubmit(comment: string, isHelpful: boolean) {
    const response = isHelpful ? 'yes' : 'no'
    const currentUrl =
      typeof window !== 'undefined' ? window.location.href : 'Unknown'

    // Send detailed feedback
    await sendFeedback(response, currentUrl, comment)

    setSubmitted(true)
  }

  return (
    <>
      <div className="relative h-8">
        <Transition show={!submitted}>
          <FeedbackForm
            className="duration-300 data-[leave]:pointer-events-none data-[closed]:opacity-0"
            onSubmit={onSubmit}
            onCommentClick={onCommentClick}
          />
        </Transition>
        <Transition show={submitted}>
          <FeedbackThanks className="delay-150 duration-300 data-[closed]:opacity-0" />
        </Transition>
      </div>

      <FeedbackModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={onModalSubmit}
      />
    </>
  )
}
