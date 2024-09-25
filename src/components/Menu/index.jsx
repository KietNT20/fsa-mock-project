import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { PATH } from '@/constant/path';
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { NavLink } from 'react-router-dom';

const MenuList = () => {
    const menuItems = [
        { path: PATH.HOME, label: "Homepage" },
        { path: PATH.DASHBOARD, label: "Dashbboard" },
        { path: PATH.TASK, label: "Task" },
        { path: PATH.PROJECT, label: "Project" },
        { path: PATH.USERS, label: "User" },
    ];
    return (
        <List>
            {menuItems.map((item, index) => (
                <ListItem key={item.label} disablePadding sx={{ display: "block" }}>
                    <ListItemButton
                        component={NavLink}
                        to={item.path}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 3.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : "auto",
                                justifyContent: "center",
                            }}
                        >
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText
                            primary={item.label}
                            sx={{ opacity: open ? 1 : 0 }}
                        />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    )
}

export default MenuList