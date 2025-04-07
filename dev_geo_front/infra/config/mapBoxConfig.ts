export  const  mapBoxConfig = {
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "",
  style: "mapbox://styles/mapbox/streets-v11",
  default_position: { lng: -46.6388, lat: -23.5505 },
  DEFAULT_ZOOM: 12,
  SOURCE_ID :"census-source",
  LAYER_ID  :"census-layer",
  BATCH_SIZE : 500,
  BATCH_INTERVAL_MS : 50,
  MARKER_ICON_ID:'custom-marker-icon',
MARKER_ICON_PATH : '/location-pin.png',
CLUSTER_LAYER_ID :"clusters-circle",
CLUSTER_COUNT_LAYER_ID: "cluster-count-text"
}