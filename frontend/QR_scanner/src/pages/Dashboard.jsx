import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, Button, Paper, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Box, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
    const [tags, setTags] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [newItemName, setNewItemName] = useState('');
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const fetchTags = async () => {
        try {
            const res = await api.get('/tags');
            setTags(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCreateTag = async () => {
        if (!newItemName) return;
        try {
            await api.post('/tags', { itemName: newItemName });
            setOpenModal(false);
            setNewItemName('');
            fetchTags();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h4" fontWeight="bold">My Tags</Typography>
                <Box>
                    <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setOpenModal(true)} sx={{ mr: 2, borderRadius: 2 }}>
                        New Tag
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => { logout(); navigate('/login'); }}>
                        Logout
                    </Button>
                </Box>
            </Box>

            <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {tags.length === 0 ? (
                        <ListItem>
                            <ListItemText primary="No tags yet. Create one to protect your items!" />
                        </ListItem>
                    ) : (
                        tags.map((tag, idx) => (
                            <ListItem 
                                button 
                                key={tag.uuid} 
                                divider={idx !== tags.length -1}
                                onClick={() => navigate(`/tag/${tag.uuid}`)}
                            >
                                <QrCodeIcon sx={{ mr: 2, color: 'text.secondary' }} />
                                <ListItemText 
                                    primary={tag.itemName} 
                                    secondary={`ID: ${tag.uuid}`} 
                                    primaryTypographyProps={{ fontWeight: 'bold' }}
                                />
                                <Chip label={tag.active ? 'Active' : 'Inactive'} color={tag.active ? 'success' : 'default'} size="small" />
                            </ListItem>
                        ))
                    )}
                </List>
            </Paper>

            <Dialog open={openModal} onClose={() => setOpenModal(false)}>
                <DialogTitle>Create New Tag</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Item Name (e.g., House Keys, Laptop)"
                        fullWidth
                        variant="outlined"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => setOpenModal(false)} color="inherit">Cancel</Button>
                    <Button onClick={handleCreateTag} variant="contained" color="primary">Create</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Dashboard;
