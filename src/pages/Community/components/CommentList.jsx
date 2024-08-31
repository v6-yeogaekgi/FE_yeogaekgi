import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import React, { useEffect, useContext } from 'react';
import CommentItem from './CommentItem';
import { CommentDispatchContext, CommentStateContext } from '../Post';
import { Card, Divider } from '@mui/material';

const CommentList = () => {
    const { comment } = useContext(CommentStateContext);
    const { deepLApi, onDelete, getApi } = useContext(CommentDispatchContext);

    // 처음 렌더링될 때 실행
    useEffect(() => {
        getApi();
    }, []);

    return (
        <Card
            sx={{
                boxShadow: 'none',
                borderRadius: '20px',
            }}
        >
            {comment.length > 0 && (
                <>
                    <ListSubheader
                        component="div"
                        id="nested-list-subheader"
                        sx={{
                            borderRadius: '20px 20px 0 0',
                            backgroundColor: '#2E85E0',
                            color: '#fff',
                            padding: '8px 16px',
                            fontFamily: 'Noto Sans',
                            fontWeight: 'bold',
                            textAlign: 'left',
                            lineHeight: 1.5,
                        }}
                    >
                        Comments
                    </ListSubheader>

                    {comment.map((it, index) => (
                        <React.Fragment key={it.id}>
                            <CommentItem
                                {...it}
                                onDelete={onDelete}
                                deepLApi={deepLApi}
                            />
                            {index < comment.length - 1 && (
                                <Divider
                                    sx={{ backgroundColor: 'light gray' }}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </>
            )}
        </Card>
    );
};

export default CommentList;
