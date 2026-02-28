import React from "react";
import { Box, Typography, Container, Stack } from "@mui/material";

export default function HowItWorksSection() {
  return (
    <Box sx={{ py: 12, bgcolor: "background.default" }}>
      <Container maxWidth="md">
        <Typography variant="h4" textAlign="center" fontWeight={600} mb={6}>
          How It Works
        </Typography>

        <Stack spacing={4}>
          <Typography>
            1️⃣ Attach the smart tag to your keys or wallet.
          </Typography>
          <Typography>
            2️⃣ If someone finds it, they scan the QR code.
          </Typography>
          <Typography>
            3️⃣ They send you a secure message without seeing your phone number.
          </Typography>
          <Typography>
            4️⃣ You coordinate pickup safely.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}