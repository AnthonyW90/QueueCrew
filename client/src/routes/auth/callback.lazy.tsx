import { createLazyFileRoute } from '@tanstack/react-router'
import { SignIn } from '../signin.lazy'

export const Route = createLazyFileRoute('/auth/callback')({
  component: () => <SignIn />
})