import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/wiki/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center space-y-5">
      <ul className="flex flex-col items-center justify-center list-disc">
        <li>This is the main "definitions" or "wiki" part of the site</li>
        <li>
          If we are trying to emulate Wikipedia's behavior, this page will reroute to
          /wiki/main_page or something similar, where we can have whatever information is important
          (e.g. most popular defn. of the day)
        </li>
      </ul>

      <div className="flex flex-row">
        <p className="font-bold">For now, let's provide links to some definitions: &nbsp; </p>
        <Link
          className="text-decoration-line: underline text-blue-600 hover:text-blue-800"
          to={'/wiki/1'}
        >
          Definition 1
        </Link>
        &nbsp;
        <Link
          className="text-decoration-line: underline text-blue-600 hover:text-blue-800"
          to={'/wiki/2'}
        >
          Definition 2
        </Link>
      </div>
    </div>
  );
}
