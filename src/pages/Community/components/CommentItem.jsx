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
import Button from '../../../components/BasicButton/BasicButton'
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
                                <Button
                                    size="small"
                                    variant="contained"
                                    text="번역"
                                    sx={{ mr: 1 }} // 버튼 사이의 마진
                                    btnColor='#4653f9'
                                    textColor="ffffff"
                                    startIcon={<TranslateIcon />}
                                />
                            </React.Fragment>
                        }
                    />
                    <Button
                        size="small"
                        aria-label="edit"
                        startIcon={<EditIcon />}
                        sx={{ alignSelf: 'center' }} // 버튼을 세로 중앙에 정렬
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
            </List>
        </div>
    );
};

export default CommentItem;