import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { CssBaseline, ThemeProvider, createTheme, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import QrCode2Icon from '@mui/icons-material/QrCode2';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TagDetails from './pages/TagDetails';
import ScanPage from './pages/ScanPage';
import Chat from './pages/Chat';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32', // A nice green color
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#fdfdfd',
    }
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  },
});

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

const NavigationBar = () => {
  return (
    <AppBar position="static" elevation={0} color="transparent" sx={{ borderBottom: '1px solid #e0e0e0' }}>
      <Toolbar>
        <QrCode2Icon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Lost & Found
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Box display="flex" flexDirection="column" minHeight="100vh">
            <NavigationBar />
            <Box flexGrow={1}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/scan/:uuid" element={<ScanPage />} />
                {/* <Route path="/scan/:uuid" element={<LandingPage />} /> */}

                <Route path="/dashboard" element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } />
                <Route path="/tag/:uuid" element={
                  <PrivateRoute>
                    <TagDetails />
                  </PrivateRoute>
                } />
              </Routes>
            </Box>
          </Box>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;