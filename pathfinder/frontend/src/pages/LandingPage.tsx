import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import {
  School,
  Business,
  TrendingUp,
  Security,
  Speed,
  Support,
} from '@mui/icons-material'

export default function LandingPage() {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const features = [
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'AI-Powered Matching',
      description: 'Advanced algorithms match students with the perfect internship opportunities based on skills, preferences, and career goals.',
    },
    {
      icon: <School sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'PM Scheme Integration',
      description: 'Seamless integration with government schemes like Prime Minister\'s Internship Scheme for enhanced opportunities.',
    },
    {
      icon: <Business sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Company Portal',
      description: 'Comprehensive platform for companies to post internships, manage applications, and find the best candidates.',
    },
    {
      icon: <Security sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Secure & Verified',
      description: 'End-to-end verification system ensuring authentic profiles and secure document handling.',
    },
    {
      icon: <Speed sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Real-time Updates',
      description: 'Instant notifications and real-time communication between students and employers.',
    },
    {
      icon: <Support sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: '24/7 Support',
      description: 'Comprehensive support system with chatbots and human assistance for all users.',
    },
  ]

  return (
    <Box>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pathfinder
          </Typography>
          <Button color="inherit" onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button color="inherit" onClick={() => navigate('/register')}>
            Register
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant={isMobile ? 'h3' : 'h2'} component="h1" gutterBottom>
                Find Your Perfect Internship
              </Typography>
              <Typography variant="h6" paragraph sx={{ opacity: 0.9 }}>
                AI-powered platform connecting students with top companies through intelligent matching and government scheme integration.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: 'white',
                    color: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.9)',
                    },
                  }}
                  onClick={() => navigate('/register')}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'rgba(255,255,255,0.8)',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 400,
                }}
              >
                <Typography variant="h4" align="center">
                  🚀 AI-Powered Matching
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          Why Choose Pathfinder?
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
          Comprehensive platform designed for modern internship management
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          backgroundColor: theme.palette.grey[100],
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Box textAlign="center">
            <Typography variant="h4" component="h2" gutterBottom>
              Ready to Start Your Journey?
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              Join thousands of students and companies already using Pathfinder to find their perfect match.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              sx={{ mt: 2 }}
            >
              Get Started Today
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: theme.palette.grey[900],
          color: 'white',
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Pathfinder
              </Typography>
              <Typography variant="body2" color="text.secondary">
                AI-powered internship matching platform with government scheme integration.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button color="inherit" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button color="inherit" onClick={() => navigate('/register')}>
                  Register
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 4, pt: 2, borderTop: 1, borderColor: 'grey.700' }}>
            <Typography variant="body2" color="text.secondary" align="center">
              © 2024 Pathfinder. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}


