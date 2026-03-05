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
import AddItemModal from "./AddItemModal"; // Importe o novo arquivo

import { createAuction } from "../api/auctions";
import { fetchCategories } from "../api/categories";
import { createItem } from "../api/items";

export default function AddAuctionModal({
  open,
  handleClose,
  onAuctionCreated,
}) {
  const [auctionData, setAuctionData] = useState({
    name: "",
    category: "",
    owner: "",
    start_time: "",
    end_time: "",
  });
  const [items, setItems] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleChange = (e) =>
    setAuctionData({ ...auctionData, [e.target.name]: e.target.value });

  const handleSaveItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      const auctionResponse = await createAuction(auctionData);

      const newAuctionId = auctionResponse.id;

      if (items.length > 0) {
        const itemsToPost = items.map((item) => ({
          ...item,
          auction: newAuctionId,
          starting_bid: parseFloat(item.starting_bid),
          max_bid: parseFloat(item.max_bid),
        }));

        for (const item of itemsToPost) {
          await createItem(item);
        }
      }

      const completeNewAuction = {
        ...auctionResponse,
        items: items,
      };

      if (onAuctionCreated) {
        onAuctionCreated(completeNewAuction);
      }

      setAuctionData({
        name: "",
        category: "",
        owner: "",
        start_time: "",
        end_time: "",
      });
      setItems([]);

      alert("Leilão e itens criados com sucesso!");
      
      handleClose();
    } catch (err) {
      console.error("Erro completo:", err.response?.data);
      alert("Erro na criação. Verifique o console.");
    }
  };

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategoryData(data.results))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: "bold" }}>Criar Novo Leilão</DialogTitle>
      <Divider />
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            label="Nome do Leilão"
            name="name"
            fullWidth
            onChange={handleChange}
          />

          <Stack direction="row" spacing={2}>
            <TextField
              select
              label="Categoria"
              name="category"
              fullWidth
              value={auctionData.category}
              onChange={handleChange}
            >
              {categoryData.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Proprietário"
              name="owner"
              fullWidth
              value={auctionData.owner}
              onChange={handleChange}
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Usuário Padrão">Usuário Padrão</MenuItem>
            </TextField>
          </Stack>

          <Stack direction="row" spacing={2}>
            <TextField
              label="Início"
              name="start_time"
              type="datetime-local"
              fullWidth
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
            <TextField
              label="Fim"
              name="end_time"
              type="datetime-local"
              fullWidth
              InputLabelProps={{ shrink: true }}
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
                Itens ({items.length})
              </Typography>
              <Button
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => setIsItemModalOpen(true)}
              >
                Novo Item
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
          Cancelar
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          Criar Leilão
        </Button>
      </DialogActions>

      <AddItemModal
        open={isItemModalOpen}
        handleClose={() => setIsItemModalOpen(false)}
        onSave={handleSaveItem}
        auctionName={auctionData.name}
        ownerName={auctionData.owner}
      />
    </Dialog>
  );
}
