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
                <ListItem alignItems="flex-start" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <ListItemAvatar>
                        <Avatar alt="Country Flag" src={getCountryImgById(countryId)} />
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
                                <br />
                                <div style={{
                                    marginTop: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    justifyContent: 'flex-end'
                                }}>
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