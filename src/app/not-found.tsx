import { Button } from '@/components/Button'
import { HeroPattern } from '@/components/HeroPattern'
import { SquareArrowOutUpRight } from 'lucide-react'

export default function NotFound() {
  return (
    <>
      <HeroPattern />
      <div className="mx-auto flex h-full max-w-xl flex-col items-center justify-center py-16 text-center">
        <p className="text-lg text-zinc-900 dark:text-white">404s suck!</p>
        <img src="https://arweave.net/JluJoV__SITJWXvtzkoKvsMoRqQOWnvVX7G6kAj2RdU"></img>
        <h1 className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-400">
          Good thing the permaweb has
        </h1>
        <p className="mt-2 text-2xl font-bold text-zinc-600 underline dark:text-white">
          <a
            href="https://ardrive.io/fragility-of-the-internet/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center"
          >
            {' '}
            no more 404s <SquareArrowOutUpRight className="w-4 h-4"/>
          </a>
        </p>
        <Button href="/" arrow="right" className="mt-8">
          Back to Home
        </Button>
      </div>
    </>
  )
}
