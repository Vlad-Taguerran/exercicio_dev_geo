import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify, JWTPayload } from "jose";

const secretKey = process.env.JWT_SECRET;
if (!secretKey) {
  throw new Error("A variável de ambiente JWT_SECRET não está definida.");
}

// Função para validar o token com jose
async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const secret = new TextEncoder().encode(secretKey);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error("Erro ao verificar token:", error);
    return null;
  }
}

export default async function middleware(request: NextRequest) {
 
  const token = request.cookies.get("authToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const user = await verifyToken(token);

  if (!user || !user.userId) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const response = NextResponse.next();
  response.headers.set("X-User-Id", user.userId.toString());

  return response;
}

export const config = {
  matcher: ["/home"],
};
