import React, { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useTheme,
  useMediaQuery,
  Badge,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Dashboard,
  Person,
  Work,
  Assignment,
  School,
  Business,
  AdminPanelSettings,
  Notifications,
  Logout,
  Settings,
  TrendingUp,
  Group,
  Assessment,
} from '@mui/icons-material'
import { useAuth } from '../hooks/useAuth'

const drawerWidth = 240

interface NavigationItem {
  label: string
  icon: React.ReactNode
  path: string
  roles?: string[]
}

const navigationItems: NavigationItem[] = [
  {
    label: 'Dashboard',
    icon: <Dashboard />,
    path: '/dashboard',
    roles: ['STUDENT', 'EMPLOYER', 'ADMIN', 'GOVERNMENT_ADMIN'],
  },
  {
    label: 'Profile',
    icon: <Person />,
    path: '/profile',
    roles: ['STUDENT', 'EMPLOYER', 'ADMIN', 'GOVERNMENT_ADMIN'],
  },
]

const studentNavigationItems: NavigationItem[] = [
  {
    label: 'Applications',
    icon: <Assignment />,
    path: '/student/applications',
  },
  {
    label: 'Internships',
    icon: <Work />,
    path: '/student/internships',
  },
  {
    label: 'Matching',
    icon: <TrendingUp />,
    path: '/student/matching',
  },
  {
    label: 'PM Scheme',
    icon: <School />,
    path: '/student/pm-scheme',
  },
]

const companyNavigationItems: NavigationItem[] = [
  {
    label: 'Internships',
    icon: <Work />,
    path: '/company/internships',
  },
  {
    label: 'Applications',
    icon: <Assignment />,
    path: '/company/applications',
  },
  {
    label: 'Candidates',
    icon: <Group />,
    path: '/company/candidates',
  },
]

const adminNavigationItems: NavigationItem[] = [
  {
    label: 'Users',
    icon: <Group />,
    path: '/admin/users',
  },
  {
    label: 'Analytics',
    icon: <Assessment />,
    path: '/admin/analytics',
  },
]

export const Layout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleProfileMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
    handleProfileMenuClose()
  }

  const getNavigationItems = (): NavigationItem[] => {
    if (!user) return []

    const baseItems = [...navigationItems]

    switch (user.role) {
      case 'STUDENT':
        return [...baseItems, ...studentNavigationItems]
      case 'EMPLOYER':
        return [...baseItems, ...companyNavigationItems]
      case 'ADMIN':
      case 'GOVERNMENT_ADMIN':
        return [...baseItems, ...adminNavigationItems]
      default:
        return baseItems
    }
  }

  const getDashboardPath = (): string => {
    if (!user) return '/login'

    switch (user.role) {
      case 'STUDENT':
        return '/student/dashboard'
      case 'EMPLOYER':
        return '/company/dashboard'
      case 'ADMIN':
        return '/admin/dashboard'
      case 'GOVERNMENT_ADMIN':
        return '/government/dashboard'
      default:
        return '/dashboard'
    }
  }

  const navItems = getNavigationItems()

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Pathfinder
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <ListItem
              button
              key={item.label}
              onClick={() => {
                navigate(item.path)
                if (isMobile) {
                  setMobileOpen(false)
                }
              }}
              sx={{
                backgroundColor: isActive ? theme.palette.primary.light : 'transparent',
                color: isActive ? theme.palette.primary.contrastText : 'inherit',
                '&:hover': {
                  backgroundColor: isActive
                    ? theme.palette.primary.light
                    : theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive ? theme.palette.primary.contrastText : 'inherit',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          )
        })}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {user?.role === 'STUDENT' && 'Student Portal'}
            {user?.role === 'EMPLOYER' && 'Company Portal'}
            {user?.role === 'ADMIN' && 'Admin Portal'}
            {user?.role === 'GOVERNMENT_ADMIN' && 'Government Portal'}
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={handleProfileMenuOpen}>
            <Avatar sx={{ width: 32, height: 32 }}>
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
      >
        <MenuItem onClick={() => navigate('/profile')}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={() => navigate('/settings')}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}
