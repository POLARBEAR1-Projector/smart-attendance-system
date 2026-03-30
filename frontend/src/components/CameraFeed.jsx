import React, { useRef, useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, CircularProgress, Typography, Alert, Container } from '@mui/material';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export default function CameraFeed() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(err => console.error("Camera error:", err));
  }, []);

  const captureAndVerify = async () => {
    setLoading(true);
    try {
      const context = canvasRef.current.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, 640, 480);
      const imageData = canvasRef.current.toDataURL('image/jpeg').split(',')[1];

      const response = await axios.post(`${API_URL}/api/face/verify`, {
        image_data: imageData,
        threshold: 0.85
      });

      setResult(response.data);
    } catch (error) {
      setResult({
        verified: false,
        message: 'Error verifying face',
        confidence_score: 0
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" mb={2}>📹 Live Camera Feed</Typography>
          <Box sx={{ mb: 2, borderRadius: 2, overflow: 'hidden', bgcolor: '#000' }}>
            <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxHeight: '480px' }} />
          </Box>
          <canvas ref={canvasRef} style={{ display: 'none' }} width={640} height={480} />
          <Button variant="contained" color="primary" fullWidth onClick={captureAndVerify} disabled={loading} sx={{ mb: 2 }}>
            {loading ? <CircularProgress size={24} /> : '✓ Verify Face'}
          </Button>
          {result && (
            <Alert severity={result.verified ? 'success' : 'error'}>
              <Typography variant="subtitle1">{result.message}</Typography>
              <Typography variant="caption">Confidence: {(result.confidence_score * 100).toFixed(2)}%</Typography>
            </Alert>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}