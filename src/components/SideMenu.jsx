import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function SideMenu() {
  return (
    <Box
      sx={{
        width: 240,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6">Menu</Typography>
      </Box>
      <Divider />

      <Box sx={{ flexGrow: 1 }}></Box>

      <Divider />
      <Stack direction="row" sx={{ p: 2, gap: 1, alignItems: "center" }}>
        <Avatar
          alt="Riley Carter"
          src="/static/images/avatar/7.jpg"
          sx={{ width: 36, height: 36 }}
        />
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Riley Carter
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            riley@email.com
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
