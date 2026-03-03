import AuctionCard from "../components/AuctionCard";
import { Box } from "@mui/material";

export default function Auctions() {
  const leiloesData = [
    {
      id: 1,
      name: "PS5",
      status: "Ativo",
      category: "Games",
      start: "01/03",
      end: "10/03",
    },
    {
      id: 2,
      name: "Xbox",
      status: "Ativo",
      category: "Games",
      start: "02/03",
      end: "12/03",
    },
    {
      id: 3,
      name: "PC Master",
      status: "Aguardando",
      category: "Tech",
      start: "15/03",
      end: "20/03",
    },
    {
      id: 3,
      name: "PC Master",
      status: "Encerrado",
      category: "Tech",
      start: "15/03",
      end: "20/03",
    },
    {
      id: 3,
      name: "PC Master",
      status: "Aguardando",
      category: "Tech",
      start: "15/03",
      end: "20/03",
    },
    {
      id: 3,
      name: "PC Master",
      status: "Cancelado",
      category: "Tech",
      start: "15/03",
      end: "20/03",
    },
  ];

  // Lógica para agrupar: { "Ativo": [...], "Aguardando": [...] }
  const groupedLeiloes = leiloesData.reduce((acc, item) => {
    if (!acc[item.status]) acc[item.status] = [];
    acc[item.status].push(item);
    return acc;
  }, {});

  return (
    <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 3, p: 2 }}>
      {Object.keys(groupedLeiloes).map((status) => (
        <AuctionCard
          key={status}
          status={status}
          items={groupedLeiloes[status]}
        />
      ))}
    </Box>
  );
}
