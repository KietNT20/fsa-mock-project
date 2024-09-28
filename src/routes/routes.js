import { PATH } from '@/constant/path';
import { AccountBox, Dashboard, Home, Task, Work } from '@mui/icons-material';

export const ROUTES = [
  { path: PATH.HOME, label: 'Home', icon: Home },
  { path: PATH.DASHBOARD, label: 'Dashboard', icon: Dashboard },
  { path: PATH.TASK, label: 'Tasks', icon: Task },
  { path: PATH.PROJECT, label: 'Projects', icon: Work },
  { path: PATH.USERS, label: 'Users', icon: AccountBox },
];
