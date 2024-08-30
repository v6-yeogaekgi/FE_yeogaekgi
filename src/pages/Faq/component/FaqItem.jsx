import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import { Box, Typography } from '@mui/material';

const FaqItem = ({ title, content }) => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <ListItemButton
                onClick={handleClick}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    fontFamily: 'Noto Sans',
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        mr: 2,
                        fontFamily: 'Noto Sans',
                        fontWeight: 'bold',
                        color: '#4653f9',
                    }}
                >
                    Q
                </Typography>

                <ListItemText
                    primary={title}
                    sx={{
                        fontFamily: 'Noto Sans, sans-serif',
                        fontWeight: 700,
                    }}
                />

                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton
                        sx={{ pl: 4, fontFamily: 'Noto Sans, sans-serif' }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: '#f5f5f5',
                                borderRadius: 5,
                                padding: '8px 16px',
                                width: '100%',
                                fontFamily: 'Noto Sans, sans-serif',
                            }}
                        >
                            <ListItemText
                                primary={content}
                                sx={{
                                    wordBreak: 'break-word',
                                    display: 'block',
                                    fontFamily: 'Noto Sans',
                                }}
                            />
                        </Box>
                    </ListItemButton>
                </List>
            </Collapse>
        </>
    );
};

export default FaqItem;
