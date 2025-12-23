const BACKEND_URL = import.meta.env.BACKEND_URL;

export async function getDefaultDefinitions() {
  console.log(`${BACKEND_URL}`);
  const res = await fetch(`${BACKEND_URL}/definitions`);
  if (!res.ok) {
    throw new Error(`Failed: ${res.status}`);
  }
  console.log(res);
}
