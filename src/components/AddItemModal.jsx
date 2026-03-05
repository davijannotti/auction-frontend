import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Divider,
} from "@mui/material";
import { useState } from "react";

export default function AddItemModal({
  open,
  handleClose,
  onSave,
  auctionName,
  ownerName,
}) {
  const [itemData, setItemData] = useState({
    name: "",
    description: "",
    starting_bid: "",
    max_bid: "",
    image: "",
    auctionName: auctionName || "",
    ownerName: ownerName || "",
  });

  const handleChange = (e) => {
    setItemData({ ...itemData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(itemData);
    setItemData({
      name: "",
      description: "",
      starting_bid: "",
      max_bid: "",
      image: "",
    });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontWeight: "bold" }}>Detalhes do Item</DialogTitle>
      <Divider />
      <DialogContent>
        <Stack spacing={2.5} sx={{ mt: 1 }}>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Leilão"
              disabled={!!auctionName}
              value={auctionName || itemData.auctionName}
              fullWidth
              size="small"
            />
            <TextField
              label="Proprietário"
              disabled={!!ownerName}
              value={ownerName || itemData.ownerName}
              fullWidth
              size="small"
            />
          </Stack>
          <Divider />
          <TextField
            label="Nome do Item"
            name="name"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            label="Descrição"
            name="description"
            multiline
            rows={2}
            fullWidth
            onChange={handleChange}
          />
          <Stack direction="row" spacing={2}>
            <TextField
              label="Lance Inicial"
              name="starting_bid"
              type="number"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              label="Lance Máximo"
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
          Cancelar
        </Button>
        <Button onClick={handleSave} variant="contained">
          Adicionar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
