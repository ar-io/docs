'use client'

import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (comment: string, isHelpful: boolean) => void
  preSelectedResponse?: boolean | null // Optional prop to pre-select response
}

export function FeedbackModal({
  isOpen,
  onClose,
  onSubmit,
  preSelectedResponse = null,
}: FeedbackModalProps) {
  const [comment, setComment] = useState('')
  const [isHelpful, setIsHelpful] = useState<boolean | null>(
    preSelectedResponse,
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Reset state when modal opens with new preSelectedResponse
  useEffect(() => {
    if (isOpen) {
      setIsHelpful(preSelectedResponse)
      setComment('')
    }
  }, [isOpen, preSelectedResponse])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isHelpful === null) return

    // Require comment when "No" is selected
    if (isHelpful === false && !comment.trim()) return

    setIsSubmitting(true)
    try {
      await onSubmit(comment.trim(), isHelpful)
      setComment('')
      setIsHelpful(null)
      onClose()
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setComment('')
      setIsHelpful(null)
      onClose()
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 dark:bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-zinc-900">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Share Your Feedback
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  {/* Helpful/Not Helpful Selection */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Was this page helpful?
                    </label>
                    <div className="mt-2 flex gap-3">
                      <button
                        type="button"
                        onClick={() => setIsHelpful(true)}
                        className={clsx(
                          'flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                          isHelpful === true
                            ? 'bg-emerald-100 text-emerald-800 ring-2 ring-emerald-500 dark:bg-emerald-900/30 dark:text-emerald-200 dark:ring-emerald-400'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
                        )}
                      >
                        👍 Yes, helpful
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsHelpful(false)}
                        className={clsx(
                          'flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                          isHelpful === false
                            ? 'bg-red-100 text-red-800 ring-2 ring-red-500 dark:bg-red-900/30 dark:text-red-200 dark:ring-red-400'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
                        )}
                      >
                        👎 No, not helpful
                      </button>
                    </div>
                  </div>

                  {/* Comment Textarea */}
                  <div>
                    <label
                      htmlFor="comment"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Tell us more{' '}
                      {isHelpful === false ? '(required)' : '(optional)'}
                    </label>
                    <textarea
                      id="comment"
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="What would make this page more helpful? Any suggestions or issues you encountered?"
                      className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-emerald-400 dark:focus:ring-emerald-400"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={handleClose}
                      disabled={isSubmitting}
                      className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={
                        isHelpful === null ||
                        isSubmitting ||
                        (isHelpful === false && !comment.trim())
                      }
                      className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-gray-900"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Feedback'}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
