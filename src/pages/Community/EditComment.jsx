import * as React from 'react';
import CommentEditor from './components/CommentEditor';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';



const EditComment = () => {
    return (
        <>
            <Box>
                <CommentEditor />
                <Box sx={{marginTop: 2}}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            text="edit"
                            variant="contained"
                            sx={{
                                backgroundColor: '#4653f9',
                                color: 'white',
                                marginRight: 1, // 오른쪽 마진을 추가하여 버튼 간의 간격 조절
                            }}
                        >
                            Edit
                        </Button>
                        <Button
                            text="cancel"
                            variant="contained"
                            sx={{
                                backgroundColor: 'gray',
                                color: 'white',
                            }}
                        >

                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Box>


        </>
    );
};
export default EditComment;