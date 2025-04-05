"use server"
import { cookies } from 'next/headers';

const Api = async (url: string, options: RequestInit = {}) => {
  const cookieStore =  cookies(); // Sem await
  
  const token = (await cookieStore).get('authToken')?.value;
  
  const headers: HeadersInit = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };

  // Evita erro ao usar GET (fetch não aceita body em GET)
  if (options.method?.toUpperCase() === "GET") {
    delete options.body;
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    headers,
  });

  return response; 
};

export default Api;
