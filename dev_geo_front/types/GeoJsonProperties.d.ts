import { ICensusPoint } from "@/application/interfaces/ICensusPoint";

export type GeoJsonProperties = Omit<ICensusPoint, 'latitude' | 'longitude'>;