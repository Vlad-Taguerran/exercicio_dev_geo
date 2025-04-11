import { useCensoStore } from "@/application/stores/CensoMetric.store";
import { mapBoxConfig } from "@/infra/config/mapBoxConfig";
import { Geometry, Point, Polygon } from "geojson";
import { Map, GeoJSONFeature } from "mapbox-gl";

/**
 * Verifica se um ponto (longitude, latitude) está dentro do polígono.
 */
function isPointInsidePolygon(point: number[], polygon: number[][]): boolean {
  let inside = false;
  const x = point[0], y = point[1];
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0], yi = polygon[i][1];
    const xj = polygon[j][0], yj = polygon[j][1];

    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

/**
 * Calcula estatísticas dos pontos dentro do polígono.
 */
export function calculateStatistics(polygon: GeoJSONFeature, map: Map) {

  // Obtém as coordenadas do polígono
  if (polygon.geometry.type !== "Polygon") {
    console.error("O objeto não é um polígono válido", polygon.geometry);
    return;
  }
  const polygonCoordinates = (polygon.geometry as Polygon).coordinates[0] as number[][];

  // Obtém todas as camadas de pontos do mapa
  const allPoints = map.queryRenderedFeatures({ layers: [mapBoxConfig.LAYER_ID] });

  // Filtra os pontos dentro do polígono
  function isPoint(geometry: Geometry): geometry is Point {
    return geometry.type === "Point" && "coordinates" in geometry;
  }

  const pointsInsidePolygon = allPoints
    .filter((feature) => isPoint(feature.geometry)) // Garante que é um ponto
    .filter((feature) => {
      const point = (feature.geometry as Point).coordinates as number[];
      return isPointInsidePolygon(point, polygonCoordinates);
    });

  if (pointsInsidePolygon.length === 0) {
    console.log("Nenhum ponto dentro do polígono.");
    return;
  }

  // Lista de chaves dos dados do censo que queremos calcular
  const keys = [
    "agro",
    "construcao",
    "domicilio_coletivo",
    "domicilio_particular",
    "ensino",
    "latitude",
    "longitude",
    "outras_finalidades",
    "religioso",
    "saude"

  ];

  const statistics: Record<string, { total: number; sum: number; mean: number; median: number }> = {};

  keys.forEach((key) => {
    // Obtém os valores do atributo nos pontos dentro do polígono
    const values = pointsInsidePolygon
      .map((point) => point.properties?.[key] ?? 0)
      .filter((v) => typeof v === "number"); // Filtra apenas números

    const totalPoints = values.length;
    const sum = values.reduce((acc, val) => acc + val, 0);
    const mean = totalPoints ? sum / totalPoints : 0;
    const sortedValues = [...values].sort((a, b) => a - b);
    const median =
      totalPoints % 2 === 0
        ? (sortedValues[totalPoints / 2 - 1] + sortedValues[totalPoints / 2]) / 2
        : sortedValues[Math.floor(totalPoints / 2)];

    statistics[key] = { total: totalPoints, sum, mean, median };
  });
  useCensoStore.getState().setMetric(statistics);
  useCensoStore.getState().changeMetricState();
  return statistics;
}
