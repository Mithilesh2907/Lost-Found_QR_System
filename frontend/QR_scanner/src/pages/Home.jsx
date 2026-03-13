import React from 'react';
import { Container, Typography, Button, Box, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SecurityIcon from '@mui/icons-material/Security';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const Home = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ pt: 10, pb: 6 }}>
            <Container maxWidth="lg">
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Typography variant="h2" fontWeight="bold" color="primary" gutterBottom>
                            Never Lose What Matters.
                        </Typography>
                        <Typography variant="h5" color="textSecondary" paragraph sx={{ mb: 4 }}>
                            Generate anonymous QR codes for your valuables. If someone finds your item, they can scan it to privately share its location with you.
                        </Typography>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            size="large" 
                            onClick={() => navigate('/register')}
                            sx={{ borderRadius: 30, px: 4, py: 1.5, fontSize: '1.2rem', mr: 2 }}
                        >
                            Get Started
                        </Button>
                        <Button 
                            variant="outlined" 
                            color="primary" 
                            size="large" 
                            onClick={() => navigate('/login')}
                            sx={{ borderRadius: 30, px: 4, py: 1.5, fontSize: '1.2rem' }}
                        >
                            Sign In
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box p={2}>
                            <Paper elevation={6} sx={{ p: 4, borderRadius: 5, bgcolor: '#f5f5f5' }}>
                                <Box display="flex" alignItems="center" mb={3}>
                                    <SecurityIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold">100% Anonymous</Typography>
                                        <Typography variant="body2" color="textSecondary">Keep your personal info safe from strangers.</Typography>
                                    </Box>
                                </Box>
                                <Box display="flex" alignItems="center" mb={3}>
                                    <QrCodeScannerIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold">Easy Scanning</Typography>
                                        <Typography variant="body2" color="textSecondary">Finders scan easily without downloading anything.</Typography>
                                    </Box>
                                </Box>
                                <Box display="flex" alignItems="center">
                                    <NotificationsActiveIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold">Instant Alerts</Typography>
                                        <Typography variant="body2" color="textSecondary">Get notified with the exact location.</Typography>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Home;
