import { createFileRoute } from '@tanstack/react-router';

function Index() {
  return (
    <div className="p-2 flex flex-col space-y-2 justify-center items-center min-h-screen">
      <h3 className="font-bold">Welcome to the Crypto Wiki! This is the home/landing page.</h3>
      <p>
        Show some sort of searchbar here in order to look up definitions (similar to Google Scholar)
      </p>
    </div>
  );
}

export const Route = createFileRoute('/')({
  component: Index,
});
