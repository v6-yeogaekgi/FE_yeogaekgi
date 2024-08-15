import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";

const SettingsDrawer = () => {
    const [state, setState] = React.useState({
        bottom: false,
    });

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, bottom: open });
    };

    const list = () => (
        <Box
            sx={{
                width: 400,
                margin: '0 auto',
                backgroundColor: 'white',
                boxShadow: 'rgba(100, 100, 100, 0.2) 0px 7px 29px 0px',
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {["주카드 설정", "충전", "환급", "잔액 전환"].map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {["카드 상세", "카드 삭제"].map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor="bottom"
                open={state.bottom}
                onClose={toggleDrawer(false)}
                PaperProps={{
                    sx: {
                        width: '100%',
                        height: 'auto',
                        maxHeight: '80%',
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    },
                }}
                BackdropProps={{
                    sx: {
                        backgroundColor: 'transparent',
                    }
                }}
            >
                {list()}
            </Drawer>
        </div>
    );
};

export default SettingsDrawer;