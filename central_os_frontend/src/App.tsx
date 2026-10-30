import React, { useState, useEffect } from 'react';
import { 
  AppBar, Toolbar, Typography, Button, Container, Box, 
  CssBaseline, ThemeProvider, createTheme, Paper,
  TextField, Link, Avatar, CircularProgress
} from '@mui/material';
import { 
  Dashboard as DashboardIcon, 
  AccountCircle, 
  Logout as LogoutIcon,
  CalendarMonth as CalendarIcon,
  Flag as FlagIcon
} from '@mui/icons-material';
import { BrowserRouter as Router, Routes, Route, Navigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

// Use environment variable for API base URL (Docker-friendly)
const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8000/api';

// --- Components ---

interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
  userEmail: string;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onLogout, userEmail }) => (
  <AppBar position="static" elevation={0} sx={{ backgroundColor: 'white', color: 'text.primary' }}>
    <Container maxWidth="lg">
      <Toolbar disableGutters>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: 'primary.main' }}>
          CENTRAL OS
        </Typography>
        {isAuthenticated ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>{userEmail}</Typography>
            <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
              <AccountCircle />
            </Avatar>
            <Button color="inherit" startIcon={<LogoutIcon />} onClick={onLogout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button component={RouterLink} to="/login" color="inherit">Login</Button>
            <Button component={RouterLink} to="/signup" color="primary" variant="contained">
              Sign Up
            </Button>
          </Box>
        )}
      </Toolbar>
    </Container>
  </AppBar>
);

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${API_BASE}/auth/api/login/`, { email, password });
      localStorage.setItem('token', 'dummy'); // Simplified
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Login to Central OS
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Typography color="error" variant="body2" sx={{ mt: 2 }}>{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Link component={RouterLink} to="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (password1 !== password2) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    try {
      const res = await axios.post(`${API_BASE}/auth/api/register/`, { email, password1, password2 });
      alert('Registered! Check console for email verification link.');
      window.location.href = '/login';
    } catch (err: any) {
      const errors = err.response?.data || {};
      setError(Object.values(errors).flat().join(', ') || 'Signup failed');
    }
    setLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Create Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password1"
            label="Password"
            type="password"
            id="password1"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password2"
            label="Confirm Password"
            type="password"
            id="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          {error && <Typography color="error" variant="body2" sx={{ mt: 2 }}>{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign Up'}
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Link component={RouterLink} to="/login" variant="body2">
              {"Already have an account? Login"}
            </Link>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const [quarters, setQuarters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch quarters and goals
    axios.get(`${API_BASE}/planning/api/quarters/`)
      .then(res => {
        setQuarters(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Life Planning Dashboard</Typography>
        <Button variant="contained" startIcon={<CalendarIcon />}>
          Add Quarter
        </Button>
      </Box>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {quarters.map((q) => (
            <Paper key={q.id} elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                {q.year} Q{q.quarter}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Created: {new Date(q.created_at).toLocaleDateString()}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {q.goals.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">No goals yet.</Typography>
                ) : (
                  q.goals.map((g: any) => (
                    <Paper key={g.id} variant="outlined" sx={{ p: 2, borderRadius: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                        {g.title}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {g.description || 'No description'}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" color={g.is_completed ? 'success.main' : 'error.main'}>
                          {g.is_completed ? 'Completed' : 'Pending'}
                        </Typography>
                        <FlagIcon color={g.priority === 1 ? 'error' : g.priority === 2 ? 'warning' : 'info'} />
                      </Box>
                    </Paper>
                  ))
                )}
              </Box>
            </Paper>
          ))}
        </Box>
      )}
    </Container>
  );
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    // Check auth status
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // In real app, fetch user profile
      setUserEmail('user@example.com');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} userEmail={userEmail} />
        <Box component="main" sx={{ mt: 2 }}>
          <Routes>
            <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
