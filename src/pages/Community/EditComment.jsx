import * as React from 'react';
import CommentEditor from './components/CommentEditor';
import { useParams } from 'react-router-dom';
import useComment from './hooks/useComment';


const EditComment = () => {
    const { commentId } = useParams();

    // const data = useComment(commentId);


    // if (!data) {
    //     return <div>Loading...</div>;
    // } else {
        return (
            <>
                <div>{commentId}번 comment</div>

                <CommentEditor
                    initData={{
                        commentId: 1,
                        postNo: 1,
                        email: 'user1@test.com',
                        nickname: 'test1',
                        content: 'test입니다.',
                        regDate: new Date().getTime(),
                        modDate: new Date().getTime(),
                        countryId: 2,
                    }}
                    onSubmit={() => alert('Edit 버튼 클릭')}
                />
            </>
        );
    // }


};
export default EditComment;