const API_BASE = 'https://api.pufolink.com/api/v1';

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, options);

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`API error: ${res.status} - ${error}`);
  }

  return res.json();
}