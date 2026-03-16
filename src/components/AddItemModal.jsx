import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Divider,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import { apiAuctionsList } from "../api/index";

export default function AddItemModal({
  open,
  handleClose,
  onSave,
  auctionName,
  ownerName,
}) {
  const [item, setItem] = useState({
    name: "",
    description: "",
    starting_bid: "",
    max_bid: "",
    image: "",
    auction: "",
    ownerName: "",
  });

  const [auctionData, setAuctionData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const aucData = await apiAuctionsList();
        setAuctionData(aucData.results);
      } catch (error) {
        console.error("Error retrieving data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (auctionName) {
      onSave(item);
      setItem({
        name: "",
        description: "",
        starting_bid: "",
        max_bid: "",
        image: "",
      });
    } else {
      await createItem(item);
    }

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontWeight: "bold" }}>Detalhes do Item</DialogTitle>
      <Divider />
      <DialogContent>
        <Stack spacing={2.5} sx={{ mt: 1 }}>
          <Stack direction="row" spacing={2}>
            {auctionName ? (
              <TextField
                label="Auction"
                value={auctionName}
                disabled
                fullWidth
                size="small"
              />
            ) : (
              <TextField
                select
                label="Auction"
                name="auction"
                value={item.auction}
                onChange={handleChange}
                fullWidth
                size="small"
              >
                {loading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : auctionData?.length > 0 ? (
                  auctionData.map((auc) => (
                    <MenuItem key={auc.id} value={auc.id}>
                      {auc.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="">No auction found</MenuItem>
                )}
              </TextField>
            )}
            <TextField
              label="Owner"
              disabled
              value={ownerName || item.ownerName}
              fullWidth
              size="small"
            />
          </Stack>
          <Divider />
          <TextField
            label="Item Name"
            name="name"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            label="Description"
            name="description"
            multiline
            rows={2}
            fullWidth
            onChange={handleChange}
          />
          <Stack direction="row" spacing={2}>
            <TextField
              label="Startign Bid"
              name="starting_bid"
              type="number"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              label="Max Bid"
              name="max_bid"
              type="number"
              fullWidth
              onChange={handleChange}
            />
          </Stack>
          <TextField
            type="file"
            name="image"
            fullWidth
            onChange={handleChange}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
