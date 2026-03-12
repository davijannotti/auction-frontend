import AuctionCard from "../components/AuctionCard";
import AddAuctionModal from "../components/AddAuctionModal";
import AddItemModal from "../components/AddItemModal";
import { fetchAuctions } from "../api/auctions";
import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

export default function Auctions() {
  const [auctionData, setAuctionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [itemModalOpen, setItemModalOpen] = useState(false);

  const ordemDesejada = ["AGUARDANDO", "ATIVO", "ENCERRADO", "CANCELADO"];

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAuctions();
        setAuctionData(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar:", error);
      }
    };
    loadData();
  }, []);

  const handleNewAuction = (newAuction) => {
    setAuctionData((prevAuctions) => [newAuction, ...prevAuctions]);
  };

  const groupedAuctions = auctionData.reduce((acc, item) => {
    if (!acc[item.status]) acc[item.status] = [];
    acc[item.status].push(item);
    return acc;
  }, {});

  if (loading) {
    return <p>Loading auctions...</p>;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          onClick={() => setItemModalOpen(true)}
          variant="contained"
          size="small"
          startIcon={<AddIcon fontSize="inherit" />}
          sx={{
            border: 1,
            mr: 2,
          }}
        >
          Add Item
        </Button>

        <Button
          onClick={() => setModalOpen(true)}
          variant="contained"
          size="small"
          startIcon={<AddIcon fontSize="inherit" />}
          sx={{
            border: 1,
          }}
        >
          Create auction
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          gap: 3,
          p: 2,
          overflow: "hidden",
        }}
      >
        {ordemDesejada.map((status) => {
          const itemsParaEsteStatus = groupedAuctions[status];

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

      <AddAuctionModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        onAuctionCreated={handleNewAuction}
      />

      <AddItemModal
        open={itemModalOpen}
        handleClose={() => setItemModalOpen(false)}
      />
    </>
  );
}
