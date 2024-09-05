import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useMap } from '../provider/MapProvider';
import { IconButton, Menu, Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';

export default function MapMarkerCheck() {
    const {
        state,
        handleFilterChange,
        handleLike,
        handleReview,
        handleClick,
        handleFilter,
        anchorEl,
        open,
    } = useMap();

    const { Tour, ACTIVITY, ETC } = state;

    return (
        <Box
            sx={{
                backgroundColor: 'transparent',
                flexGrow: 1,
                zIndex: 1000,
                width: '350px',
                left: 'calc(50% - 200px)',
                m: 3,
                position: 'absolute',
            }}
        >
            {/* FormControl Section */}
            <FormControl
                component="fieldset"
                variant="standard"
                sx={{ display: 'inline-block' }}
            >
                <FormGroup row>
                    {/* Tour Checkbox */}
                    <Box
                        sx={{
                            backgroundColor: '#5356FF',
                            display: 'flex',
                            alignItems: 'center',
                            mr: 1,
                            borderRadius: '15px',
                            width: 'auto',
                            height: '20px',
                        }}
                    >
                        &nbsp; &nbsp;
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={Tour}
                                    onChange={handleFilterChange}
                                    name="Tour"
                                    icon={
                                        <LocationOnIcon
                                            fontSize="small"
                                            sx={{
                                                color: '#DFF5FF',
                                            }}
                                        />
                                    }
                                    checkedIcon={
                                        <LocationOnIcon
                                            fontSize="small"
                                            sx={{
                                                color: '#AAAAAA',
                                            }}
                                        />
                                    }
                                />
                            }
                            label="Tour"
                            sx={{
                                '& .MuiTypography-root': {
                                    fontSize: '0.75rem',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                },
                            }}
                        />
                    </Box>

                    {/* ACTIVITY Checkbox */}
                    <Box
                        sx={{
                            backgroundColor: '#378CE7',
                            display: 'flex',
                            alignItems: 'center',
                            mr: 1,
                            borderRadius: '15px',
                            width: 'auto',
                            height: '20px',
                        }}
                    >
                        &nbsp; &nbsp;
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={ACTIVITY}
                                    onChange={handleFilterChange}
                                    name="ACTIVITY"
                                    icon={
                                        <LocationOnIcon
                                            fontSize="small"
                                            sx={{
                                                color: '#DFF5FF',
                                            }}
                                        />
                                    }
                                    checkedIcon={
                                        <LocationOnIcon
                                            fontSize="small"
                                            sx={{
                                                color: '#AAAAAA',
                                            }}
                                        />
                                    }
                                />
                            }
                            label="ACTIVITY"
                            sx={{
                                '& .MuiTypography-root': {
                                    fontSize: '0.75rem',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                },
                            }}
                        />
                    </Box>

                    {/* ETC Checkbox */}
                    <Box
                        sx={{
                            backgroundColor: '#67C6E3',
                            display: 'flex',
                            alignItems: 'center',
                            mr: 1,
                            borderRadius: '15px',
                            width: 'auto',
                            height: '20px',
                        }}
                    >
                        &nbsp; &nbsp;
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={ETC}
                                    onChange={handleFilterChange}
                                    name="ETC"
                                    icon={
                                        <LocationOnIcon
                                            fontSize="small"
                                            sx={{
                                                color: '#DFF5FF',
                                            }}
                                        />
                                    }
                                    checkedIcon={
                                        <LocationOnIcon
                                            fontSize="small"
                                            sx={{
                                                color: '#AAAAAA',
                                            }}
                                        />
                                    }
                                />
                            }
                            label="ETC"
                            sx={{
                                '& .MuiTypography-root': {
                                    fontSize: '0.75rem',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                },
                            }}
                        />
                    </Box>
                </FormGroup>
            </FormControl>

            {/* Tooltip Section */}
            <Tooltip title="Account settings" name="toolTip">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{
                        mb: 2,
                        position: 'absolute',
                        right: '0',
                        top: -12,
                    }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                </IconButton>
            </Tooltip>

            {/* Menu Section */}
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleFilter}
                onClick={handleFilter}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{
                    horizontal: 'right',
                    vertical: 'top',
                }}
                anchorOrigin={{
                    horizontal: 'right',
                    vertical: 'bottom',
                }}
            >
                <MenuItem onClick={handleLike}>
                    <Avatar /> LIKE
                </MenuItem>
                <MenuItem onClick={handleReview}>
                    <Avatar /> My Review
                </MenuItem>
            </Menu>
        </Box>
    );
}
