import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/signin')({
  component: SignIn,
})

export function SignIn() {

  function handleSignIn(){
    window.location.href = "https://discord.com/oauth2/authorize?client_id=1267324967679299664&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fdiscord%2Fcallback&scope=identify";
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