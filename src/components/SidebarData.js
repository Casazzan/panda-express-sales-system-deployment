import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BadgeIcon from '@mui/icons-material/Badge';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';

export const SidebarData = [
  {
    title: JSON.parse(localStorage.getItem("home")),
    icon: <HomeIcon />,
    link: "/manager"
  },
  {
    title: JSON.parse(localStorage.getItem("sales")),
    icon: <AttachMoneyIcon />,
    link: "/manager/sales"
  },
  {
    title: JSON.parse(localStorage.getItem("employee")),
    icon: <BadgeIcon />,
    link: "/manager/employee"
  },
  {
    title: JSON.parse(localStorage.getItem("inventory")),
    icon: <AssessmentIcon />,
    link: "/manager/inventory"
  },
  {
    title: JSON.parse(localStorage.getItem("accessibility")),
    icon: <SettingsAccessibilityIcon />,
    link: "/manager/accessibility"
  },
]
