import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, Alert } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const toErrorMessage = (err) => {
        const data = err?.response?.data;
        if (typeof data === 'string' && data.trim()) return data;
        if (data && typeof data === 'object') return data.message || data.error || JSON.stringify(data);
        return err?.message || 'Failed to register. Please try again.';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await api.post('/auth/register', { email, password, phoneNumber });
            navigate('/login');
        } catch (err) {
            setError(toErrorMessage(err));
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 10 }}>
            <Paper elevation={4} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">Create Account</Typography>
                <Typography variant="body2" color="textSecondary" mb={3}>Securely track your lost items</Typography>
                
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                
                <form onSubmit={handleSubmit}>
                    <TextField 
                        fullWidth label="Email Address" variant="outlined" margin="normal"
                        value={email} onChange={(e) => setEmail(e.target.value)} required 
                    />
                    <TextField 
                        fullWidth label="Phone Number" variant="outlined" margin="normal"
                        value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required 
                    />
                    <TextField 
                        fullWidth label="Password" type="password" variant="outlined" margin="normal"
                        value={password} onChange={(e) => setPassword(e.target.value)} required 
                    />
                    <Button fullWidth type="submit" variant="contained" color="primary" size="large" sx={{ mt: 3, mb: 2, borderRadius: 2 }}>
                        Register
                    </Button>
                </form>
                <Typography variant="body2">
                    Already have an account? <Link to="/login" style={{textDecoration: 'none', color: '#1976d2'}}>Sign in</Link>
                </Typography>
            </Paper>
        </Container>
    );
};

export default Register;
