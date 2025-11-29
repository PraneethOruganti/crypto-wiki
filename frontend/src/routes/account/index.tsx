import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/account/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-row justify-center items-center min-h-screen">
      if user is logged in, it shows the user's account settings. Otherwise, redirects to login page
    </div>
  );
}
