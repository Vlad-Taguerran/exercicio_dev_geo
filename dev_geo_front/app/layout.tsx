import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import React from "react";
import { NextAppProvider } from '@toolpad/core/nextjs';
import LinearProgress from '@mui/material/LinearProgress';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import {Home} from '@mui/icons-material'
import UploadFileIcon from '@mui/icons-material/UploadFile';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Teste Geo Code",
  description: "Teste com localização de mapa",
};
const Navi = [
  {
    segment: 'home',
    title: 'Home',
    icon: <Home/>
  },{
    segment:'home/cadastrar/csv',
    title:'cadastrar Csv',
    icon: <UploadFileIcon/>
  }
]
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link href="https://api.mapbox.com/mapbox-gl-js/v3.10.0/mapbox-gl.css" rel="stylesheet"></link>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
      
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <React.Suspense fallback={<LinearProgress />}>
        <NextAppProvider navigation={Navi} >
          {children}
        </NextAppProvider>
      </React.Suspense>
    </AppRouterCacheProvider> 
      </body>
    </html>
  );
}
