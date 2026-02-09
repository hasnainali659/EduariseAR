import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  AppBar,
  Toolbar,
} from '@mui/material';
import { Add, School, Visibility, CheckCircle, Star } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            EduariseAR Creator Studio
          </Typography>
          <Button color="inherit">Profile</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Welcome */}
        <Typography variant="h4" gutterBottom>
          Welcome back! 👋
        </Typography>

        {/* Stats */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <div>
                    <Typography color="textSecondary" gutterBottom>
                      Projects
                    </Typography>
                    <Typography variant="h4">0</Typography>
                  </div>
                  <School color="primary" sx={{ fontSize: 40 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <div>
                    <Typography color="textSecondary" gutterBottom>
                      Views
                    </Typography>
                    <Typography variant="h4">0</Typography>
                  </div>
                  <Visibility color="primary" sx={{ fontSize: 40 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <div>
                    <Typography color="textSecondary" gutterBottom>
                      Complete
                    </Typography>
                    <Typography variant="h4">0%</Typography>
                  </div>
                  <CheckCircle color="primary" sx={{ fontSize: 40 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <div>
                    <Typography color="textSecondary" gutterBottom>
                      Rating
                    </Typography>
                    <Typography variant="h4">5.0</Typography>
                  </div>
                  <Star color="primary" sx={{ fontSize: 40 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Recent Projects */}
        <Box sx={{ mt: 4 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5">Recent Projects</Typography>
            <Button variant="outlined" onClick={() => navigate('/projects')}>
              View All
            </Button>
          </Box>

          <Card>
            <CardContent sx={{ textAlign: 'center', py: 6 }}>
              <School sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                No projects yet
              </Typography>
              <Typography color="textSecondary" paragraph>
                Create your first AR project to get started
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                size="large"
                onClick={() => navigate('/projects')}
              >
                Create New Project
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
}
