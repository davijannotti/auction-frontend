import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
  Typography,
  Divider,
  Box,
  Paper,
  IconButton,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddItemModal from "./AddItemModal";
import { apiCategoriesList, apiUsersList, apiAuctionsCreate, apiItemsCreate } from "../api/index";

export default function AddAuctionModal({ open, handleClose }) {
  const [auction, setAuction] = useState({
    name: "",
    category: "",
    owner: 1,
    start_time: "",
    end_time: "",
  });
  const [items, setItems] = useState([]);

  const [categoriesData, setCategoriesData] = useState([]);
  const [usersData, setUsersData] = useState([]);

  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data, error } = await apiCategoriesList();
        setCategoriesData(data.results);

        // const useData = await apiUsersList();
        // setUsersData(useData.results);
      } catch (error) {
        console.error("Error retrieving data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleChange = (e) =>
    setAuction({ ...auction, [e.target.name]: e.target.value });

  const handleSaveItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      console.log(auction);
      const auctionResponse = await apiAuctionsCreate(auction);

      const newAuctionId = auctionResponse.id;

      if (items.length > 0) {
        const itemsToPost = items.map((item) => ({
          ...item,
          auction: newAuctionId,
          starting_bid: parseFloat(item.starting_bid),
          max_bid: parseFloat(item.max_bid),
        }));

        for (const item of itemsToPost) {
          await apiItemsCreate(item);
        }
      }

      setAuction({
        name: "",
        category: "",
        owner: 1,
        start_time: "",
        end_time: "",
      });
      setItems([]);

      alert("Auction and items created successfully!");

      handleClose();
    } catch (err) {
      console.error("Complete error:", err.response?.data);
      alert("Error during creation. Check the console.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: "bold" }}>Create new Auction</DialogTitle>
      <Divider />
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            label="Auction name"
            name="name"
            fullWidth
            onChange={handleChange}
          />

          <Stack direction="row" spacing={2}>
            <TextField
              select
              label="Category"
              name="category"
              fullWidth
              value={auction.category}
              onChange={handleChange}
            >
              {loading ? (
                <MenuItem value="">Loading...</MenuItem>
              ) : categoriesData?.length > 0 ? (
                categoriesData?.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">No categories found</MenuItem>
              )}
            </TextField>
            <TextField label="Owner" value="Admin" disabled fullWidth />
          </Stack>

          <Stack direction="row" spacing={2}>
            <TextField
              label="Start"
              name="start_time"
              type="datetime-local"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              onChange={handleChange}
            />
            <TextField
              label="End"
              name="end_time"
              type="datetime-local"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              onChange={handleChange}
            />
          </Stack>

          <Divider />

          <Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Items ({items.length})
              </Typography>
              <Button
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => setIsItemModalOpen(true)}
              >
                New Item
              </Button>
            </Stack>

            <Stack spacing={1}>
              {items.map((item, index) => (
                <Paper
                  key={index}
                  variant="outlined"
                  sx={{
                    p: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2">
                    <strong>{item.name}</strong> - R$ {item.starting_bid}
                  </Typography>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleRemoveItem(index)}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Paper>
              ))}
            </Stack>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          Create Auction
        </Button>
      </DialogActions>

      <AddItemModal
        open={isItemModalOpen}
        handleClose={() => setIsItemModalOpen(false)}
        onSave={handleSaveItem}
        auctionName={auction.name}
        ownerName={auction.owner}
      />
    </Dialog>
  );
}
