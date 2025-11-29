import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/macros/$slug')({
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = Route.useParams();
  return (
    <div className="flex flex-row items-center justify-center min-h-screen">
      <p>
        View/edit macro_set <span className="font-bold">#{slug}</span> here
      </p>
    </div>
  );
}
