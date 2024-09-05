import React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useMap } from '../provider/MapProvider';
import { useParams } from 'react-router-dom';

export default function MapMarkerCheck() {
    const { state, handleFilterChange } = useMap();
    const { Tour, ACTIVITY, ETC } = state;
    return (
        <FormControl
            sx={{
                backgroundColor: 'transparent',
                flexGrow: 1,
                zIndex: 1000,
                width: 350,
                left: 'calc(50% - 200px)',
                m: 3,
                position: 'absolute',
            }}
            component="fieldset"
            variant="standard"
        >
            <FormGroup row>
                <Box
                    sx={{
                        backgroundColor: '#5356FF',
                        display: 'flex',
                        alignItems: 'center',
                        mr: 1,
                        borderRadius: '15px', // Fully rounded corners
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
                <Box
                    sx={{
                        backgroundColor: '#378CE7',
                        display: 'flex',
                        alignItems: 'center',
                        mr: 1,
                        borderRadius: '15px', // Fully rounded corners
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
                <Box
                    sx={{
                        backgroundColor: '#67C6E3',
                        display: 'flex',
                        alignItems: 'center',
                        mr: 1,
                        borderRadius: '15px', // Fully rounded corners
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
    );
}
