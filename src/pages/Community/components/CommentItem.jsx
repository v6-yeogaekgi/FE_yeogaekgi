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
import Button from '@mui/material/Button';
import TranslateIcon from '@mui/icons-material/Translate';


const CommentItem = ({
                         commentId,
                         comment,
                         regDate,
                         modDate,
                         postId,
                         memberId,
                         nickname,
                         countryId,
                     }) => {
    const navigate = useNavigate();

    // const goEdit = () => {
    //     navigate(`/edit/${id}`);
    // };

    return (
        <div className="CommentItem">
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={getCountryImgById(countryId)} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={nickname}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {comment}
                                </Typography>
                                <br/>

                                <Button size="small" variant="contained" endIcon={<TranslateIcon />} >번역</Button>

                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />


            </List>
        </div>
    );
};

export default CommentItem;