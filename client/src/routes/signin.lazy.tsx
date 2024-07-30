import { createLazyFileRoute } from '@tanstack/react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react';

export const Route = createLazyFileRoute('/signin')({
  component: SignIn,
})

async function initiateDiscordAuth() {
  const response = await fetch('/api/auth/discord', { credentials: 'include'});
  if(response.ok) {
    const data = await response.json();
    console.log(data)
    window.location.href = data;
  } else {
    throw new Error('Failed to initiate Discord Authentication');
  }
}

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

export function SignIn() {
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

  const handleSignIn = () => {
    initiateDiscordAuth()
  }

  if (authMutation.isPending) {
    return <div className="flex justify-center items-center h-screen">Authenticating...</div>;
  }

  if (authMutation.isError) {
    return <div className="flex justify-center items-center h-screen text-red-500">Authentication failed. Please try again.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Welcome to QueueCrew</h1>
        <p className="mb-4 text-center">Sign in with your Discord account to get started.</p>
        <button
          onClick={handleSignIn}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-200"
        >
          Sign In with Discord
        </button>
      </div>
    </div>
  );
}