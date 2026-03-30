import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import CameraFeed from './components/CameraFeed';
import Dashboard from './components/Dashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState('camera');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            🎓 Smart Attendance System
          </Typography>
          <Button color="inherit" onClick={() => setCurrentPage('camera')}>
            Camera
          </Button>
          <Button color="inherit" onClick={() => setCurrentPage('dashboard')}>
            Dashboard
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ flex: 1, p: 2 }}>
        {currentPage === 'camera' && <CameraFeed />}
        {currentPage === 'dashboard' && <Dashboard />}
      </Box>
    </Box>
  );
}