import React, { useState, useContext } from 'react';
import { Container, TextField, Button, Typography, Box, Paper, Alert } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const toErrorMessage = (err) => {
        const data = err?.response?.data;
        if (typeof data === 'string' && data.trim()) return data;
        if (data && typeof data === 'object') return data.message || data.error || JSON.stringify(data);
        return err?.message || 'Invalid email or password.';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await api.post('/auth/login', { email, password });
            login(res.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(toErrorMessage(err));
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 10 }}>
            <Paper elevation={4} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">Welcome Back</Typography>
                <Typography variant="body2" color="textSecondary" mb={3}>Login to manage your anonymous QR tags</Typography>
                
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                
                <form onSubmit={handleSubmit}>
                    <TextField 
                        fullWidth label="Email Address" variant="outlined" margin="normal"
                        value={email} onChange={(e) => setEmail(e.target.value)} required 
                    />
                    <TextField 
                        fullWidth label="Password" type="password" variant="outlined" margin="normal"
                        value={password} onChange={(e) => setPassword(e.target.value)} required 
                    />
                    <Button fullWidth type="submit" variant="contained" color="primary" size="large" sx={{ mt: 3, mb: 2, borderRadius: 2 }}>
                        Login
                    </Button>
                </form>
                <Typography variant="body2">
                    Don't have an account? <Link to="/register" style={{textDecoration: 'none', color: '#1976d2'}}>Sign up</Link>
                </Typography>
            </Paper>
        </Container>
    );
};

export default Login;
