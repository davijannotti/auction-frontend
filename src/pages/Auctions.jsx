import AuctionCard from "../components/AuctionCard";
import AddAuctionModal from "../components/AddAuctionModal";
import AddItemModal from "../components/AddItemModal";
import { apiAuctionsList } from "../api/index";
import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

export default function Auctions() {
  const [auctionsData, setAuctionsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [auctionModalOpen, setAuctionModalOpen] = useState(false);
  const [itemModalOpen, setItemModalOpen] = useState(false);

  const auctionOrder = ["AGUARDANDO", "ATIVO", "ENCERRADO", "CANCELADO"];

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data, error } = await apiAuctionsList();

        if (error) {
          console.error("Fail to Load:", error);
          return;
        }

        setAuctionsData(data.results);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const groupedAuctions = auctionsData.reduce((acc, item) => {
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
          onClick={() => setAuctionModalOpen(true)}
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
        {auctionOrder.map((status) => {
          const itemsStatus = groupedAuctions[status];

          if (!itemsStatus) return null;

          return (
            <AuctionCard key={status} status={status} items={itemsStatus} />
          );
        })}
      </Box>

      <AddAuctionModal
        open={auctionModalOpen}
        handleClose={() => setAuctionModalOpen(false)}
      />

      <AddItemModal
        open={itemModalOpen}
        handleClose={() => setItemModalOpen(false)}
      />
    </>
  );
}
