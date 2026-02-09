import React, { useState, useRef } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  AppBar,
  Toolbar,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Alert,
  CircularProgress,
  Chip,
  Stack,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import PublishIcon from '@mui/icons-material/Publish';
import UploadIcon from '@mui/icons-material/Upload';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import ImageIcon from '@mui/icons-material/Image';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import QrCodeIcon from '@mui/icons-material/QrCode';

const API_BASE = 'http://localhost:8000';

interface UploadedFile {
  filename: string;
  url: string;
  size: number;
  type: 'image' | 'model';
}

export default function ProjectEditor() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const modelInputRef = useRef<HTMLInputElement>(null);
  
  const [projectData, setProjectData] = useState({
    title: 'Solar System',
    description: 'Learn about planets',
    gradeLevel: '5-8',
    subject: 'Science',
  });

  const [uploads, setUploads] = useState<UploadedFile[]>([]);
  const [markers, setMarkers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_BASE}/api/upload/image`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setUploads([...uploads, { ...data, type: 'image' }]);
      setSuccess('Image uploaded successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to upload image. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleModelUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file extension
    const validExtensions = ['.glb', '.gltf', '.obj', '.fbx'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    
    if (!validExtensions.includes(fileExtension)) {
      setError(`Invalid file type. Please upload: ${validExtensions.join(', ')}`);
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_BASE}/api/upload/model`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setUploads([...uploads, { ...data, type: 'model' }]);
      setSuccess('3D Model uploaded successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to upload model. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateMarker = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/api/markers/generate?count=1`, {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Marker generation failed');

      const data = await response.json();
      // Handle both old and new API format
      const markerUrls = Array.isArray(data) 
        ? data.map(m => m.url) 
        : (data.markers || []);
      setMarkers([...markers, ...markerUrls]);
      setSuccess('Marker generated! Download it below.');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to generate marker. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewInAR = () => {
    // Open AR viewer in new tab
    window.open('/viewer/simple-ar-test.html', '_blank');
  };

  const handleSave = () => {
    console.log('Saving project:', projectData, uploads, markers);
    setSuccess('Project saved!');
    setTimeout(() => setSuccess(null), 3000);
  };

  const handlePublish = () => {
    console.log('Publishing project:', id);
    setSuccess('Project published! Share code: ABC123');
    setTimeout(() => setSuccess(null), 5000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Button
            color="inherit"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/projects')}
          >
            Back
          </Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
            Edit Project
          </Typography>
          <Button
            color="inherit"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            sx={{ mr: 1 }}
          >
            Save
          </Button>
          <Button
            color="inherit"
            startIcon={<PublishIcon />}
            onClick={handlePublish}
          >
            Publish
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4, mb: 4 }}>
        {/* Status Messages */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess(null)}>
            {success}
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Project Details */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Project Details
              </Typography>
              <TextField
                fullWidth
                label="Title"
                value={projectData.title}
                onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Description"
                value={projectData.description}
                onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                margin="normal"
                multiline
                rows={4}
              />
              <TextField
                fullWidth
                label="Grade Level"
                value={projectData.gradeLevel}
                onChange={(e) => setProjectData({ ...projectData, gradeLevel: e.target.value })}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Subject"
                value={projectData.subject}
                onChange={(e) => setProjectData({ ...projectData, subject: e.target.value })}
                margin="normal"
              />
            </Paper>
          </Grid>

          {/* AR Markers Upload */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                AR Markers
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                Upload images and 3D models to create AR experiences
              </Typography>

              {/* Hidden file inputs */}
              <input
                type="file"
                ref={imageInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleImageUpload}
              />
              <input
                type="file"
                ref={modelInputRef}
                style={{ display: 'none' }}
                accept=".glb,.gltf,.obj,.fbx"
                onChange={handleModelUpload}
              />

              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                startIcon={loading ? <CircularProgress size={20} /> : <ImageIcon />}
                onClick={() => imageInputRef.current?.click()}
                disabled={loading}
              >
                Upload Image
              </Button>
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 1 }}
                startIcon={loading ? <CircularProgress size={20} /> : <ThreeDRotationIcon />}
                onClick={() => modelInputRef.current?.click()}
                disabled={loading}
              >
                Upload 3D Model (.glb, .gltf, .obj, .fbx)
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 1 }}
                startIcon={loading ? <CircularProgress size={20} /> : <QrCodeIcon />}
                onClick={handleGenerateMarker}
                disabled={loading}
              >
                Generate Marker
              </Button>
              <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{ mt: 2 }}
                startIcon={<ViewInArIcon />}
                onClick={handleViewInAR}
              >
                🎯 View in AR
              </Button>
            </Paper>

            {/* Uploaded Files */}
            {uploads.length > 0 && (
              <Paper sx={{ p: 3, mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Uploaded Files ({uploads.length})
                </Typography>
                <Stack spacing={2}>
                  {uploads.map((file, index) => (
                    <Card key={index} variant="outlined">
                      <CardContent>
                        <Stack direction="row" spacing={2} alignItems="center">
                          {file.type === 'image' ? (
                            <ImageIcon color="primary" />
                          ) : (
                            <ThreeDRotationIcon color="secondary" />
                          )}
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="body1" noWrap>
                              {file.filename}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {formatFileSize(file.size)} • {file.type === 'image' ? 'Image' : '3D Model'}
                            </Typography>
                          </Box>
                          <Chip
                            label="✓ Uploaded"
                            color="success"
                            size="small"
                          />
                        </Stack>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          onClick={() => window.open(`${API_BASE}${file.url}`, '_blank')}
                        >
                          View File
                        </Button>
                      </CardActions>
                    </Card>
                  ))}
                </Stack>
              </Paper>
            )}

            {/* Generated Markers */}
            {markers.length > 0 && (
              <Paper sx={{ p: 3, mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Generated Markers ({markers.length})
                </Typography>
                <Stack spacing={2}>
                  {markers.map((markerUrl, index) => (
                    <Card key={index} variant="outlined">
                      <CardMedia
                        component="img"
                        height="140"
                        image={`${API_BASE}${markerUrl}`}
                        alt={`Marker ${index}`}
                        sx={{ objectFit: 'contain', bgcolor: 'white' }}
                      />
                      <CardActions>
                        <Button
                          size="small"
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = `${API_BASE}${markerUrl}`;
                            link.download = `marker_${index}.png`;
                            link.click();
                          }}
                        >
                          Download Marker
                        </Button>
                        <Button
                          size="small"
                          onClick={() => window.print()}
                        >
                          Print
                        </Button>
                      </CardActions>
                    </Card>
                  ))}
                </Stack>
              </Paper>
            )}
          </Grid>
        </Grid>

        {/* Instructions */}
        <Paper sx={{ p: 3, mt: 3, bgcolor: '#f5f5f5' }}>
          <Typography variant="h6" gutterBottom>
            📱 How to Experience AR
          </Typography>
          <Typography variant="body2" paragraph>
            1. Upload an image or 3D model above
          </Typography>
          <Typography variant="body2" paragraph>
            2. Generate a marker (or use the Hiro marker)
          </Typography>
          <Typography variant="body2" paragraph>
            3. Click "View in AR" button
          </Typography>
          <Typography variant="body2" paragraph>
            4. Allow camera access when prompted
          </Typography>
          <Typography variant="body2">
            5. Point your camera at the marker to see AR content!
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
