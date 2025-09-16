import React from 'react'
import { Typography, Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      gap={2}
      p={3}
    >
      <Typography variant="h1" color="primary">
        404
      </Typography>
      <Typography variant="h4" align="center">
        Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center" paragraph>
        The page you're looking for doesn't exist.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate('/')}
        size="large"
      >
        Go Home
      </Button>
    </Box>
  )
}


