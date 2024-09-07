import Card from '@mui/material/Card';
import {
    Box,
    Button,
    CardActionArea,
    CardActions,
    CardHeader,
    CircularProgress,
    IconButton,
    Typography,
} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

export default function MyLikeItem({ likeData, handleDelete }) {

    function typeFilter(type) {
        if (type === 0) return 'Tourist Attraction';

        if (type === 1) return 'Activity';

        return 'ETC';
    }

    return (
        <div className="likeItem" style={{ marginBottom: '5px' }}>
            <Card
                sx={{
                    padding: '10px',
                    boxShadow: 'none',
                    borderRadius: 5,
                    backgroundColor: '#ffffff',
                    mb: 2,
                    position: 'relative',
                }}
            >
                <CardHeader
                    action={
                        <IconButton
                            aria-label="delete"
                            onClick={() =>
                                handleDelete(likeData.servicesLikeId)
                            }
                        >
                            <DeleteIcon />
                        </IconButton>
                    }
                    title={likeData.name}
                    subheader={typeFilter(likeData.type)}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                />
                <CardContent>
                    <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary' }}
                    >
                        {likeData.content}
                    </Typography>
                </CardContent>
                <CardActions
                    className="like-footer"
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary' }}
                    >
                        {likeData.address}
                    </Typography>
                </CardActions>
            </Card>
        </div>
    );
}
