import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
                            backgroundColor: '#007AFF', // 아이폰 스타일의 파란색
                            color: 'white',
                        }}
                    >
                        My
                    </Avatar>
                </IconButton>
            </Tooltip>

            {/* Menu Section */}
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleFilter}
                onClick={handleFilter}
                PaperProps={{
                    sx: {
                        backgroundColor: 'transparent', // 메뉴 배경 제거
                        boxShadow: 'none', // 그림자 제거
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
                            backgroundColor: 'transparent', // hover시 배경색 제거
                        },
                    }}
                >
                    <FavoriteIcon
                        sx={{
                            color: '#FF3B30', // 하트 빨간색
                            fontSize: 30, // 크기를 키움
                        }}
                    />
                </MenuItem>
                <MenuItem
                    onClick={handleReview}
                    sx={{
                        justifyContent: 'center',
                        padding: '10px',
                        '&:hover': {
                            backgroundColor: 'transparent', // hover시 배경색 제거
                        },
                    }}
                >
                    <RateReviewIcon
                        sx={{
                            color: '#4CD964', // 리뷰 아이콘 초록색
                            fontSize: 30, // 크기를 키움
                        }}
                    />
                </MenuItem>
            </Menu>
        </Box>
    );
}
