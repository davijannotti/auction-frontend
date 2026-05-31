import AuctionCard from "../components/AuctionCard";
import AddAuctionModal from "../components/AddAuctionModal";
import AddItemModal from "../components/AddItemModal";
import { apiAuctionsList } from "../api/index";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  Popover,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

export default function Auctions() {
  const [auctionsData, setAuctionsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [auctionModalOpen, setAuctionModalOpen] = useState(false);
  const [itemModalOpen, setItemModalOpen] = useState(false);

  const auctionStatuses = ["AGUARDANDO", "ATIVO", "ENCERRADO", "CANCELADO"];

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStatuses, setSelectedStatuses] = useState([
    ...auctionStatuses,
  ]);

  const [search, setSearch] = useState("");

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

  const handleFilterClick = (e) => setAnchorEl(e.currentTarget);
  const handleFilterClose = () => setAnchorEl(null);

  const handleStatusToggle = (status) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );
  };

  const filteredAuctions = auctionsData.filter(
    (auction) =>
      selectedStatuses.includes(auction.status) &&
      auction.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return <p>Loading auctions...</p>;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          my: 15,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignSelf: "center",
            my: 1,
            px: 2,
            backgroundColor: "#151F28",
            borderRadius: 4,
            gap: 2,
          }}
        >
          <TextField
            placeholder="Search auctions..."
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: { "& fieldset": { border: "none" }, width: 400 },
            }}
          />
          <Button
            disableRipple
            onClick={handleFilterClick}
            sx={{
              "&:hover": { backgroundColor: "transparent" },
              color: "white",
              fontWeight: "bold",
              fontSize: 12,
            }}
          >
            Filter
          </Button>

          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleFilterClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            slotProps={{
              paper: {
                sx: { ml: 3 },
              },
            }}
          >
            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle2" fontWeight="bold" mb={1}>
                Status
              </Typography>
              <FormGroup>
                {auctionStatuses.map((status) => (
                  <FormControlLabel
                    key={status}
                    control={
                      <Checkbox
                        checked={selectedStatuses.includes(status)}
                        onChange={() => handleStatusToggle(status)}
                        size="small"
                      />
                    }
                    label={status}
                  />
                ))}
              </FormGroup>
            </Box>
          </Popover>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            justifyItems: "center",
            alignContent: "start",
            rowGap: 3,
            columnGap: 1,
            p: 2,
            mt: 6,
            height: 440,
            width: 1400,
            overflowY: "auto",
            mx: "auto",
            border: 1,
            borderRadius: 2,
            borderColor: "divider",
          }}
        >
          {filteredAuctions.length === 0 ? (
            <Box
              sx={{
                gridColumn: "1 / -1",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography variant="body1" color="text.secondary">
                No auctions found
              </Typography>
            </Box>
          ) : (
            filteredAuctions.map((auction) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))
          )}
        </Box>

        {/* <Button
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
        })} */}
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
