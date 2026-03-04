import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  Stack,
} from "@mui/material";

export default function AuctionCard({ status, items }) {
  const getStatusColor = (status) => {
    if (status === "ATIVO") return "success";
    if (status === "AGUARDANDO") return "warning";
    if (status === "ENCERRADO") return "error";
    return "default";
  };

  return (
    <Card
      sx={{
        flex: "1 1 300px", // Pode crescer, PODE ENCOLHER, e o tamanho base é 300px
        maxWidth: 390, // Mas nunca fica maior que 390px
        minWidth: 200, // Tamanho mínimo antes de ficar ilegível
        borderRadius: 2,
        boxShadow: 2,
        height: "fit-content",
        transition: "all 0.3s ease", // Para o encolhimento ser suave junto com o menu
      }}
    >
      <CardContent>
        {/* Cabeçalho do Card: O Status */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Chip
            label={status}
            color={getStatusColor(status)}
            sx={{ fontWeight: "bold", px: 2 }}
          />
        </Box>

        <List disablePadding>
          {items.map((item, index) => (
            <Box key={item.id}>
              <ListItem
                sx={{
                  flexDirection: "column",
                  alignItems: "stretch",
                  px: 0,
                  py: 2,
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold" }}
                  noWrap
                >
                  {item.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ fontWeight: 500 }}
                >
                  #{item.category}
                </Typography>

                <Stack
                  direction={"row"}
                  sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Início: {item.start_time.slice(0, -3)}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ fontWeight: "bold" }}
                  >
                    Fim: {item.start_time.slice(0, -3)}
                  </Typography>
                </Stack>
              </ListItem>
              {/* Adiciona uma linha divisória entre itens, menos no último */}
              {index < items.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
