export async function fetchAuctions(params = {}) {
  const query = new URLSearchParams(params).toString();

  const response = await fetch("http://localhost:8000/api/auctions/");

  if (!response.ok) {
    throw new Error("Failed to fetch auctions");
  }

  return response.json();
}
