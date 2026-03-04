import AuctionCard from "../components/AuctionCard";
import { fetchAuctions } from "../api/auctions";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

export default function Auctions() {
  const [leiloesData, setLeiloesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuctions()
      .then((data) => setLeiloesData(data.results))
      .finally(() => setLoading(false));
  }, []);

  const groupedLeiloes = Array.isArray(leiloesData)
    ? leiloesData.reduce((acc, item) => {
        if (!acc[item.status]) acc[item.status] = [];
        acc[item.status].push(item);
        return acc;
      }, {})
    : {};

  if (loading) {
    return <p>Loading auctions...</p>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 3,
        p: 2,
      }}
    >
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
