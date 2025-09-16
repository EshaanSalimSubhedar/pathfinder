import React from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
} from '@mui/material'
import {
  TrendingUp,
  Work,
  Assignment,
  School,
  Notifications,
  Person,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

export default function StudentDashboard() {
  const navigate = useNavigate()

  // Mock data - in real app, this would come from API
  const stats = {
    profileCompletion: 75,
    applicationsCount: 12,
    interviewsScheduled: 3,
    pmSchemeEligible: true,
  }

  const recentMatches = [
    {
      id: 1,
      title: 'Software Development Intern',
      company: 'Tech Corp',
      matchScore: 92,
      location: 'Bangalore',
      stipend: '₹15,000/month',
    },
    {
      id: 2,
      title: 'Data Science Intern',
      company: 'Data Insights',
      matchScore: 88,
      location: 'Mumbai',
      stipend: '₹12,000/month',
    },
    {
      id: 3,
      title: 'Product Management Intern',
      company: 'StartupXYZ',
      matchScore: 85,
      location: 'Delhi',
      stipend: '₹10,000/month',
    },
  ]

  const recentApplications = [
    {
      id: 1,
      title: 'Full Stack Developer Intern',
      company: 'WebTech Solutions',
      status: 'Under Review',
      appliedDate: '2024-01-15',
    },
    {
      id: 2,
      title: 'UI/UX Design Intern',
      company: 'Design Studio',
      status: 'Interview Scheduled',
      appliedDate: '2024-01-12',
    },
    {
      id: 3,
      title: 'Marketing Intern',
      company: 'Growth Co',
      status: 'Shortlisted',
      appliedDate: '2024-01-10',
    },
  ]

  const notifications = [
    {
      id: 1,
      title: 'New Internship Match',
      message: 'We found a perfect match for your profile!',
      time: '2 hours ago',
    },
    {
      id: 2,
      title: 'Interview Scheduled',
      message: 'Your interview with WebTech Solutions is scheduled for tomorrow.',
      time: '1 day ago',
    },
    {
      id: 3,
      title: 'Application Status Update',
      message: 'Your application status has been updated to "Under Review".',
      time: '2 days ago',
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'under review':
        return 'warning'
      case 'interview scheduled':
        return 'info'
      case 'shortlisted':
        return 'success'
      default:
        return 'default'
    }
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Student Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Welcome back! Here's your internship journey overview.
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Completion */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Person color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Profile Completion</Typography>
              </Box>
              <Box mb={2}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Progress</Typography>
                  <Typography variant="body2">{stats.profileCompletion}%</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={stats.profileCompletion}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
              <Button
                variant="outlined"
                onClick={() => navigate('/student/profile')}
                fullWidth
              >
                Complete Profile
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* PM Scheme Status */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <School color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">PM Scheme Eligibility</Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={2}>
                <Chip
                  label={stats.pmSchemeEligible ? 'Eligible' : 'Not Eligible'}
                  color={stats.pmSchemeEligible ? 'success' : 'error'}
                  sx={{ mr: 2 }}
                />
              </Box>
              <Button
                variant="outlined"
                onClick={() => navigate('/student/pm-scheme')}
                fullWidth
              >
                View PM Scheme
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Assignment color="primary" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="h4">{stats.applicationsCount}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Applications
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Work color="primary" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="h4">{stats.interviewsScheduled}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Interviews
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <TrendingUp color="primary" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="h4">8.5</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Avg. Match Score
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Matches */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recommended Internships
              </Typography>
              <List>
                {recentMatches.map((match, index) => (
                  <React.Fragment key={match.id}>
                    <ListItem
                      button
                      onClick={() => navigate(`/internship/${match.id}`)}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          <Work />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={match.title}
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {match.company} • {match.location}
                            </Typography>
                            <Box display="flex" alignItems="center" mt={1}>
                              <Chip
                                label={`${match.matchScore}% Match`}
                                size="small"
                                color="success"
                                sx={{ mr: 1 }}
                              />
                              <Typography variant="caption">
                                {match.stipend}
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < recentMatches.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
              <Button
                variant="outlined"
                onClick={() => navigate('/student/matching')}
                fullWidth
                sx={{ mt: 2 }}
              >
                View All Matches
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Applications */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Applications
              </Typography>
              <List>
                {recentApplications.map((application, index) => (
                  <React.Fragment key={application.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'secondary.main' }}>
                          <Assignment />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={application.title}
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {application.company}
                            </Typography>
                            <Box display="flex" alignItems="center" mt={1}>
                              <Chip
                                label={application.status}
                                size="small"
                                color={getStatusColor(application.status) as any}
                                sx={{ mr: 1 }}
                              />
                              <Typography variant="caption">
                                Applied: {application.appliedDate}
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < recentApplications.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
              <Button
                variant="outlined"
                onClick={() => navigate('/student/applications')}
                fullWidth
                sx={{ mt: 2 }}
              >
                View All Applications
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Notifications */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Notifications color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Recent Notifications</Typography>
              </Box>
              <List>
                {notifications.map((notification, index) => (
                  <React.Fragment key={notification.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'info.main' }}>
                          <Notifications />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={notification.title}
                        secondary={
                          <Box>
                            <Typography variant="body2">
                              {notification.message}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {notification.time}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < notifications.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}


