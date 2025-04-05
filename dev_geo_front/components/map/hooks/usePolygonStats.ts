import * as turf from "@turf/turf";
import { Point, Polygon } from "geojson";
import mapboxgl from "mapbox-gl";

export function calcularEstatisticas(polygon: mapboxgl.GeoJSONFeature, map: mapboxgl.Map) {
  const source = map.getSource("source-data") as mapboxgl.GeoJSONSource;
  if (!source) return;

  const data = source._data as GeoJSON.FeatureCollection;
  const pontosDentro = data.features.filter((feature) =>
    turf.booleanPointInPolygon(feature.geometry as Point, polygon.geometry as Polygon)
  );

  const valores = pontosDentro.map((p) => p.properties?.value || 0);
  const soma = valores.reduce((acc, val) => acc + val, 0);
  const media = valores.length ? soma / valores.length : 0;
  const mediana = calcularMediana(valores);

  console.log("Total de pontos:", pontosDentro.length);
  console.log("Soma:", soma);
  console.log("Média:", media);
  console.log("Mediana:", mediana);
}

function calcularMediana(valores: number[]): number {
  if (!valores.length) return 0;
  valores.sort((a, b) => a - b);
  const meio = Math.floor(valores.length / 2);
  return valores.length % 2 === 0
    ? (valores[meio - 1] + valores[meio]) / 2
    : valores[meio];
}
