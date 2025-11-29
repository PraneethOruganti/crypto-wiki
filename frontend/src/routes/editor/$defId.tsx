import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/editor/$defId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { defId } = Route.useParams();
  return <div>Here, we edit definition with ID {defId}</div>;
}
