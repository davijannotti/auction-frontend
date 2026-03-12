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
    auction: "",
    ownerName: "",
  });

  const [auctionData, setAuctionData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    setItemData({ ...itemData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (auctionName) {
      onSave(itemData);
      setItemData({
        name: "",
        description: "",
        starting_bid: "",
        max_bid: "",
        image: "",
      });
    } else {
      await createItem(itemData);
    }

    handleClose();
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const catData = await fetchCategories();
        setCategoryData(catData);

        const aucData = await fetchAuctions();
        setAuctionData(aucData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontWeight: "bold" }}>Detalhes do Item</DialogTitle>
      <Divider />
      <DialogContent>
        <Stack spacing={2.5} sx={{ mt: 1 }}>
          <Stack direction="row" spacing={2}>
            {auctionName ? (
              <TextField
                label="Leilão"
                value={auctionName}
                disabled
                fullWidth
                size="small"
              />
            ) : (
              <TextField
                select
                label="Leilão"
                name="auction"
                value={itemData.auction}
                onChange={handleChange}
                fullWidth
                size="small"
              >
                {loading ? (
                  <MenuItem value="">Carregando...</MenuItem>
                ) : auctionData?.length > 0 ? (
                  auctionData.map((auc) => (
                    <MenuItem key={auc.id} value={auc.id}>
                      {auc.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="">Nenhum leilão encontrado</MenuItem>
                )}
              </TextField>
            )}
            <TextField
              label="Proprietário"
              disabled
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
