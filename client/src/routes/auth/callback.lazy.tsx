import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export const Route = createLazyFileRoute('/auth/callback')({
  component: () => <DiscordAuthCallback />
})

async function handleAuthCallback(code: string) {
  const response = await fetch(`/api/auth/discord/callback?code=${code}`, {
    method: 'GET',
    credentials: 'include'
  });
  if(response.ok) {
    return true;
  } else {
    throw new Error('Authentication failed')
  }
}

function DiscordAuthCallback() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const authMutation = useMutation({
    mutationFn: handleAuthCallback,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      navigate({ to: '/' })
    }
  })

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    console.log(code)
    if(code) {
      authMutation.mutate(code)
    }
  }, [])

  return <div>Logging in....</div>
}