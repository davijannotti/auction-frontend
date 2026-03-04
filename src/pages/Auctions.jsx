import AuctionCard from "../components/AuctionCard";
import { fetchAuctions } from "../api/auctions";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

export default function Auctions() {
  const [leiloesData, setLeiloesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const ordemDesejada = ["AGUARDANDO", "ATIVO", "ENCERRADO", "CANCELADO"];

  useEffect(() => {
    fetchAuctions()
      .then((data) => setLeiloesData(data.results))
      .finally(() => setLoading(false));
  }, []);

  const groupedLeiloes = leiloesData.reduce((acc, item) => {
    if (!acc[item.status]) acc[item.status] = [];
    acc[item.status].push(item);
    return acc;
  }, {});

  if (loading) {
    return <p>Loading auctions...</p>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "nowrap",
        gap: 3,
        p: 2,
        overflowX: "auto",
      }}
    >
      {ordemDesejada.map((status) => {
        const itemsParaEsteStatus = groupedLeiloes[status];

        if (!itemsParaEsteStatus) return null;

        return (
          <AuctionCard
            key={status}
            status={status}
            items={itemsParaEsteStatus}
          />
        );
      })}
    </Box>
  );
}
