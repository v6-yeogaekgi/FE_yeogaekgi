import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useMap } from '../provider/MapProvider';
import { IconButton, Menu, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RateReviewIcon from '@mui/icons-material/RateReview';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';

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
    useEffect(() => {}, [state]);
    const FilterButton = ({ name, checked, color, label }) => (
        <Box
            onClick={() =>
                handleFilterChange({ target: { name, checked: !checked } })
            }
            sx={{
                backgroundColor: checked ? '#AAAAAA' : color,
                display: 'flex',
                alignItems: 'center',
                mr: 1,
                borderRadius: '15px',
                width: 'auto',
                height: '20px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                '&:hover': {
                    opacity: 0.8,
                },
            }}
        >
            &nbsp; &nbsp;
            <LocationOnIcon
                fontSize="small"
                sx={{
                    color: '#FFFFFF',
                    mr: 0.5,
                }}
            />
            <span
                style={{
                    fontSize: '0.75rem',
                    color: '#fff',
                    fontWeight: 'bold',
                    marginRight: '8px',
                }}
            >
                {label}
            </span>
            &nbsp; &nbsp;
        </Box>
    );

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
            <FormControl
                component="fieldset"
                variant="standard"
                sx={{ display: 'inline-block' }}
            >
                <FormGroup row>
                    <FilterButton
                        name="Tour"
                        checked={Tour}
                        color="#5356FF"
                        label="Tour"
                    />
                    <FilterButton
                        name="ACTIVITY"
                        checked={ACTIVITY}
                        color="#378CE7"
                        label="ACTIVITY"
                    />
                    <FilterButton
                        name="ETC"
                        checked={ETC}
                        color="#67C6E3"
                        label="ETC"
                    />
                </FormGroup>
            </FormControl>

            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{
                        position: 'absolute',
                        right: '0',
                        top: '-12px',
                        borderRadius: '50%',
                    }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar
                        sx={{
                            width: 40,
                            height: 40,
                            fontSize: '16px',
                            fontWeight: 'bold',
                            backgroundColor: '#007AFF',
                            color: 'white',
                        }}
                    >
                        My
                    </Avatar>
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleFilter}
                onClick={handleFilter}
                PaperProps={{
                    sx: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        '& .MuiList-root': {
                            padding: 0,
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
                <MenuItem
                    onClick={handleLike}
                    sx={{
                        justifyContent: 'center',
                        padding: '10px',
                        '&:hover': {
                            backgroundColor: 'transparent',
                        },
                    }}
                >
                    <FavoriteIcon
                        sx={{
                            color: '#FF3B30',
                            fontSize: 30,
                        }}
                    />
                </MenuItem>
                <MenuItem
                    onClick={handleReview}
                    sx={{
                        justifyContent: 'center',
                        padding: '10px',
                        '&:hover': {
                            backgroundColor: 'transparent',
                        },
                    }}
                >
                    <RateReviewIcon
                        sx={{
                            color: '#4CD964',
                            fontSize: 30,
                        }}
                    />
                </MenuItem>
            </Menu>
        </Box>
    );
}
