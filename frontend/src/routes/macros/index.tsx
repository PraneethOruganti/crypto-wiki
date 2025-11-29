import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/macros/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p>Manage your macro sets at this page</p>
    </div>
  );
}
