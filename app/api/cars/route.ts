export async function GET(request: Request) {
  const url = new URL(request.url);
  const apiUrl = process.env.API_URL;

  const proxyUrl = `${apiUrl}/cars${url.search}`;
  const res = await fetch(proxyUrl);

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
