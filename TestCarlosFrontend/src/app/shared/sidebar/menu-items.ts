import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
 
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/pages/packages',
    title: 'Packages',
    icon: 'bi bi-box',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/pages/users',
    title: 'Users',
    icon: 'bi bi-people',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/pages/shippings',
    title: 'Shippings',
    icon: 'bi bi-truck',
    class: '',
    extralink: false,
    submenu: []
  }
];
