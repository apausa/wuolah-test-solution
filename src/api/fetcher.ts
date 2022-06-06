const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const fetcher = async (url: string, init?: RequestInit) => {
  const res = await fetch(`${API_BASE}${url}`, {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const message = await res.json();
    throw new Error(message);
  }

  return res.json();
};
