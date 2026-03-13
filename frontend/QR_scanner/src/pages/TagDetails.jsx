import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Button, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MapIcon from '@mui/icons-material/Map';
import { QRCodeSVG } from 'qrcode.react';
import api from '../services/api';

const handlePrint = (uuid) => {
    const scanUrl = `${window.location.origin}/scan/${uuid}`;
    const printWindow = window.open('', '_blank', 'width=500,height=600');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>QR Code - ${uuid}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    margin: 0;
                    padding: 20px;
                    box-sizing: border-box;
                    background: #fff;
                }
                h2 { color: #333; margin-bottom: 4px; }
                p { color: #666; font-size: 12px; word-break: break-all; text-align: center; max-width: 300px; }
                .qr-box { border: 1px solid #ddd; padding: 16px; border-radius: 8px; margin: 16px 0; }
                @media print {
                    body { -webkit-print-color-adjust: exact; }
                }
            </style>
        </head>
        <body>
            <h2>Lost &amp; Found QR Code</h2>
            <p><strong>Tag ID:</strong> ${uuid}</p>
            <div class="qr-box">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(scanUrl)}" width="200" height="200" alt="QR Code" />
            </div>
            <p>${scanUrl}</p>
            <p style="margin-top:12px;font-size:11px;color:#999;">Scan this QR code to report the item as found.</p>
            <script>
                window.onload = function() { window.print(); };
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
};

const TagDetails = () => {
    const { uuid } = useParams();
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uuid]);

    const fetchHistory = async () => {
        try {
            const res = await api.get(`/scan/history/${uuid}`);
            setHistory(res.data);
        } catch (err) {
            console.error("Error fetching history:", err);
        } finally {
            setLoading(false);
        }
    };

    const openMap = (lat, lng) => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
    };

    const scanUrl = `${window.location.origin}/scan/${uuid}`;

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Box display="flex" alignItems="center" mb={3}>
                <IconButton onClick={() => navigate('/dashboard')} sx={{ mr: 2 }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" fontWeight="bold">Tag Details</Typography>
            </Box>

            <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 4, bgcolor: '#f5f5f5' }}>
                <Typography variant="subtitle1" color="textSecondary">Tag ID</Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ wordBreak: 'break-all' }}>{uuid}</Typography>

                <Box mt={3} p={3} bgcolor="white" borderRadius={2} border="1px solid #e0e0e0" textAlign="center">
                    <Typography variant="body2" color="textSecondary" mb={2}>
                        Scan this QR code to report the item as found
                    </Typography>
                    <Box sx={{ display: 'inline-block', p: 2, border: '2px solid #e0e0e0', borderRadius: 2, bgcolor: 'white' }}>
                        <QRCodeSVG
                            value={scanUrl}
                            size={200}
                            bgColor="#ffffff"
                            fgColor="#000000"
                            level="H"
                        />
                    </Box>
                    <Typography variant="body2" color="textSecondary" mt={1} sx={{ wordBreak: 'break-all', fontSize: '0.75rem' }}>
                        {scanUrl}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2, borderRadius: 2, textTransform: 'none', fontWeight: 'bold' }}
                        onClick={() => handlePrint(uuid)}
                    >
                        🖨️ Print QR Code (Save as PDF)
                    </Button>
                </Box>
            </Paper>

            <Typography variant="h5" fontWeight="bold" mb={2}>Scan History</Typography>
            <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                <List disablePadding>
                    {loading ? (
                        <ListItem><ListItemText primary="Loading history..." /></ListItem>
                    ) : history.length === 0 ? (
                        <ListItem><ListItemText primary="This tag has not been scanned yet." /></ListItem>
                    ) : (
                        history.map((scan, idx) => (
                            <React.Fragment key={scan.id}>
                                <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                                    <ListItemText
                                        primary={
                                            <Typography variant="subtitle1" fontWeight="bold">
                                                Message: "{scan.message || 'No message provided'}"
                                            </Typography>
                                        }
                                        secondary={
                                            <React.Fragment>
                                                <Typography component="span" variant="body2" color="text.primary">
                                                    Date: {new Date(scan.timestamp).toLocaleString()}
                                                </Typography>
                                                <br />
                                                Location: {scan.latitude.toFixed(4)}, {scan.longitude.toFixed(4)}
                                            </React.Fragment>
                                        }
                                    />
                                    <Button
                                        variant="outlined"
                                        startIcon={<MapIcon />}
                                        size="small"
                                        onClick={() => openMap(scan.latitude, scan.longitude)}
                                    >
                                        View Map
                                    </Button>
                                </ListItem>
                                {idx < history.length - 1 && <Divider component="li" />}
                            </React.Fragment>
                        ))
                    )}
                </List>
            </Paper>
        </Container>
    );
};

export default TagDetails;
