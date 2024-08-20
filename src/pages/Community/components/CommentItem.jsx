import { useNavigate } from 'react-router-dom';
import React from 'react';
import { getCountryImgById } from '../../../util';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import TranslateIcon from '@mui/icons-material/Translate';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { Grid, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const CommentItem = ({
                         commentId, nickname, content, regDate, modDate,countryId
                     }) => {
    const navigate = useNavigate();

    // const goEdit = () => {
    //     navigate(`/edit/${id}`);
    // };

    return (
        <div className="CommentItem">

            return (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid xs={8}>
                        <Item>xs=8</Item>
                    </Grid>
                    <Grid xs={4}>
                        <Item>xs=4</Item>
                    </Grid>
                    <Grid xs={4}>
                        <Item>xs=4</Item>
                    </Grid>
                    <Grid xs={8}>
                        <Item>xs=8</Item>
                    </Grid>
                </Grid>
            </Box>






            {new Date(regDate).toLocaleDateString()}
            {content}
            <Avatar alt="Country Flag" src={getCountryImgById(countryId)} />

            <Button
                id="edit-button"
                size="small"
                aria-label="edit"
                startIcon={<EditIcon />}
                sx={{
                    color: '#4653f9',
                    padding: '4px 8px',
                    fontSize: '0.75rem',
                    height: '24px',
                    minWidth: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    '& .MuiButton-startIcon': {
                        marginRight: 0,
                    },
                }}
            />
            <Button
                id="translate-button"
                size="small"
                aria-label="translate"
                startIcon={<TranslateIcon />}
                sx={{
                    color: '#4653f9',
                    padding: '4px 8px',
                    fontSize: '0.75rem',
                    height: '24px',
                    minWidth: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    '& .MuiButton-startIcon': {
                        marginRight: 0,
                    },
                }}

            />
        </div>
    );
};


export default CommentItem;