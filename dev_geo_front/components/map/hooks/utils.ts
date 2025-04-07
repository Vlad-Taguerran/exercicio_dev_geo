export interface Estatisticas {
  campo: string;
  soma: number;
  media: number;
  mediana: number;
}

export const calcularEstatisticas = (features: GeoJSON.Feature[]): Estatisticas[] => {
  const campos = [
    "censo_2022_estabelecimento_outras_finalidades_poi_counts",
    "censo_2022_domicilio_particular_poi_counts",
    "censo_2022_estabelecimento_construcao_poi_counts",
    "censo_2022_estabelecimento_religioso_poi_counts",
    "censo_2022_estabelecimento_ensino_poi_counts",
    "censo_2022_estabelecimento_saude_poi_counts",
    "censo_2022_domicilio_coletivo_poi_counts",
    "censo_2022_estabelecimento_agro_poi_counts"
  ];

  return campos.map(campo => {
    const valores = features
      .map(f => Number(f.properties?.[campo]) || 0)
      .sort((a, b) => a - b);

    const soma = valores.reduce((acc, val) => acc + val, 0);
    const media = valores.length ? soma / valores.length : 0;
    const mediana =
      valores.length % 2 === 0
        ? (valores[valores.length / 2 - 1] + valores[valores.length / 2]) / 2
        : valores[Math.floor(valores.length / 2)];
    console.log(campo, soma, media, mediana)
    return { campo, soma, media, mediana };
  });
};
