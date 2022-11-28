import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BadgeIcon from '@mui/icons-material/Badge';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';

export const SidebarData = [
  {
    title: "Home",
    icon: <HomeIcon />,
    link: "/manager"
  },
  {
    title: "Sales",
    icon: <AttachMoneyIcon />,
    link: "/manager/sales"
  },
  {
    title: "Employee",
    icon: <BadgeIcon />,
    link: "/manager/employee"
  },
  {
    title: "Inventory",
    icon: <AssessmentIcon />,
    link: "/manager/inventory"
  },
  {
    title: "Accessability",
    icon: <SettingsAccessibilityIcon />,
    link: "/manager/accessibility"
  },
]
