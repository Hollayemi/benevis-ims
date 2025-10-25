import { API_BASE_URL } from "@/lib/config";

// Get access token from localStorage
const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken');
  }
  return null;
};

export const Fetch = async (url, options = {}) => {
  const token = getAccessToken();
  const backendUrl = API_BASE_URL;

  // Construct full URL
  let fullUrl = url;
  if (!url.startsWith('http')) {
    fullUrl = `${backendUrl}/api${url.startsWith('/') ? url : `${url}`}`;
  }

  console.log({ fullUrl })

  return fetch(fullUrl, {
    ...options,
    headers: {
      ...options?.headers,
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    },
  })
};