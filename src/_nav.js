import React from 'react'
import CIcon from '@coreui/icons-react'
import { cibPagekit, cibReadTheDocs, cibSuperuser, cibWebpack, cibXrp } from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Courses',
    to: '/courses',
    icon: <CIcon icon={cibReadTheDocs} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Packages',
    to: '/packages',
    icon: <CIcon icon={cibWebpack} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Users',
    to: '/users',
    icon: <CIcon icon={cibSuperuser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Pages',
    to: '/pages',
    icon: <CIcon icon={cibPagekit} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'promoCode',
    to: '/promoCode',
    icon: <CIcon icon={cibXrp} customClassName="nav-icon" />,
  },
]

export default _nav
