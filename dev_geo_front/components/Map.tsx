'use client'
import {mapBoxConfig} from '@/infra/config/mapBoxConfig';
import { Box } from '@mui/material';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';
mapboxgl.accessToken = mapBoxConfig.accessToken;

const Map = () =>{
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
 useEffect(()=>{
  if (!mapContainerRef.current) return;
  
  const map = new mapboxgl.Map({
    container: mapContainerRef.current,
    style: mapBoxConfig.style,
    center: [-46.6333, -23.5505],
    zoom: 12 
    
  });
  return ()=> map.remove();
 },[])
 return <Box ref={mapContainerRef} sx={{width:"100%", height: "100vh"}}/>;
}

export default Map;