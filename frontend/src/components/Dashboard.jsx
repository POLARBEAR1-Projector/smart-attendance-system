import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, CircularProgress, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await axios.get(`${API_URL}/api/attendance/report/daily?report_date=${today}`);
      setStats(response.data);
      setRecords(response.data.records || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" mb={3}>📊 Attendance Dashboard</Typography>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#4caf50' }}>
            <CardContent sx={{ color: 'white' }}>
              <Typography variant="h6">Approved</Typography>
              <Typography variant="h3">{stats?.approved || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#f44336' }}>
            <CardContent sx={{ color: 'white' }}>
              <Typography variant="h6">Denied</Typography>
              <Typography variant="h3">{stats?.denied || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#ff9800' }}>
            <CardContent sx={{ color: 'white' }}>
              <Typography variant="h6">Pending</Typography>
              <Typography variant="h3">{stats?.pending || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#2196f3' }}>
            <CardContent sx={{ color: 'white' }}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h3">{stats?.total || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>Student</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Confidence</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.student?.name || 'N/A'}</TableCell>
                <TableCell>{record.status}</TableCell>
                <TableCell>{(record.confidence_score * 100).toFixed(2)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}