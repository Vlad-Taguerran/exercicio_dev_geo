'use client'
import { useCensoStore } from "@/application/stores/CensoMetric.store";
import { Modal, Card, CardContent, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

const labels: Record<keyof ReturnType<typeof useCensoStore>, string> = {
  censo_2022_domicilio_coletivo_poi_counts: "Domicílios Coletivos",
  censo_2022_domicilio_particular_poi_counts: "Domicílios Particulares",
  censo_2022_estabelecimento_agro_poi_counts: "Estabelecimentos Agropecuários",
  censo_2022_estabelecimento_construcao_poi_counts: "Estabelecimentos de Construção",
  censo_2022_estabelecimento_ensino_poi_counts: "Estabelecimentos de Ensino",
  censo_2022_estabelecimento_outras_finalidades_poi_counts: "Outros Estabelecimentos",
  censo_2022_estabelecimento_religioso_poi_counts: "Estabelecimentos Religiosos",
  censo_2022_estabelecimento_saude_poi_counts: "Estabelecimentos de Saúde",
};

export default function ModalComponet() {
  const { metricStat, data,changeMetricState } = useCensoStore();

  return (
    <Modal open={metricStat} onClose={changeMetricState} aria-labelledby="censo-modal-title">
      <Card sx={style}>
        <CardContent>
          <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
            Dados do Censo 2022
          </Typography>

          <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Categoria</TableCell>
                  <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Total de pontos</TableCell>
                  <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Soma</TableCell>
                  <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Média</TableCell>
                  <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Mediana</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(data).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell>{labels[key as keyof typeof labels]}</TableCell>
                    <TableCell>{value.total}</TableCell>
                    <TableCell>{value.sum}</TableCell>
                    <TableCell>{value.mean.toFixed(2)}</TableCell>
                    <TableCell>{value.median}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Modal>
  );
}

// Estilo do Modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 3,
};