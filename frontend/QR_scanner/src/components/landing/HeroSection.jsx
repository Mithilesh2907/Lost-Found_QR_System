import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";

export default function HeroSection() {
  return (
    <Box
      sx={{
        pt: 20,
        pb: 12,
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h2" fontWeight={700} gutterBottom>
          Lost Something? Stay Anonymous.
        </Typography>

        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Secure tags that let finders contact you without revealing your
          phone number.
        </Typography>

        <Button size="large" variant="contained" color="primary">
          Get Your Smart Tag
        </Button>
      </Container>
    </Box>
  );
}