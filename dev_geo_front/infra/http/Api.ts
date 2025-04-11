"use server"
import { cookies } from 'next/headers';

const Api = async (url: string, options: RequestInit = {}) => {
  const cookieStore =  cookies(); 
  
  const token = (await cookieStore).get('authToken')?.value;
  
  const isFormData = options.body instanceof FormData;

  const headers: HeadersInit = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : "",
    ...(isFormData ? {} : { "Content-Type": "application/json" }), 
  };
  if (options.method?.toUpperCase() === "GET") {
    delete options.body;
  }
  const base = process.env.NEXT_PUBLIC_API_URL
  const response = await fetch(`${base}${url}`, {
    ...options,
    headers,
  });

  return response; 
};

export default Api;
