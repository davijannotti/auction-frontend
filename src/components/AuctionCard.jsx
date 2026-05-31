import { Card, CardContent, Typography, Box, Chip } from "@mui/material";

export default function AuctionCard({ auction }) {
  const getStatusColor = (status) => {
    if (status === "ATIVO") return "success";
    if (status === "AGUARDANDO") return "warning";
    if (status === "ENCERRADO") return "error";
    return "default";
  };

  return (
    <Card sx={{ width: 400, height: 120, borderRadius: 2, boxShadow: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold" noWrap>
            {auction.name}
          </Typography>
          <Chip
            label={auction.status}
            color={getStatusColor(auction.status)}
            size="small"
            sx={{ fontWeight: "bold" }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary">
          #{auction.category}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Start: {auction.start_time?.slice(0, -3)}
          </Typography>
          <Typography variant="caption" color="error" fontWeight="bold">
            End: {auction.end_time?.slice(0, -3)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}