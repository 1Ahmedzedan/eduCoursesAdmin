import React from 'react'
import CIcon from '@coreui/icons-react'
import { cibPagekit, cibReadTheDocs, cibSuperuser, cibWebpack } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

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
]

export default _nav
