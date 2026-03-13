import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Button, TextField, CircularProgress, Alert } from '@mui/material';
import { useParams } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import api from '../services/api';

const ScanPage = () => {
    const { uuid } = useParams();
    const [location, setLocation] = useState(null);
    const [locError, setLocError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // Request location immediately upon scanning
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                () => {
                    setLocError("Location access denied or unavailable. We cannot notify the owner precisely.");
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        } else {
            setLocError("Geolocation is not supported by this browser.");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post(`/scan/${uuid}`, {
                message: message,
                lat: location ? location.lat : 0,
                lng: location ? location.lng : 0,
            });
            setSuccess(true);
        } catch (err) {
            console.error("Failed to submit scan", err);
            alert("Failed to notify owner. Invalid Tag ID?");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <Container maxWidth="sm" sx={{ mt: 10, textAlign: 'center' }}>
                <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
                <Typography variant="h4" fontWeight="bold" gutterBottom>Thank You!</Typography>
                <Typography variant="body1" color="textSecondary">
                    The owner has been anonymously notified about the location of this item.
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Paper elevation={4} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                    Item Found
                </Typography>
                <Typography variant="body2" color="textSecondary" mb={4}>
                    You have found a lost item. Help reunite it with its owner by submitting the form below. 
                    Your identity remains completely anonymous.
                </Typography>

                {!location && !locError && (
                    <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
                        <CircularProgress size={24} sx={{ mr: 2 }} />
                        <Typography variant="body2">Acquiring location...</Typography>
                    </Box>
                )}

                {location && (
                    <Alert severity="success" icon={<LocationOnIcon />} sx={{ mb: 3, textAlign: 'left' }}>
                        Location acquired successfully.
                    </Alert>
                )}

                {locError && (
                    <Alert severity="warning" sx={{ mb: 3, textAlign: 'left' }}>
                        {locError}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Leave a message (Optional)"
                        multiline
                        rows={3}
                        variant="outlined"
                        placeholder="e.g. I left it at the front desk of the library."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        sx={{ mb: 3 }}
                    />
                    
                    <Button 
                        fullWidth 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        size="large" 
                        disabled={loading}
                        sx={{ borderRadius: 2, height: 50 }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Notify Owner'}
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default ScanPage;
