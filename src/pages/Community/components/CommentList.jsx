import BasicButton from '../../../components/BasicButton/BasicButton';
import BasicTextField from '../../../components/BasicTextField/BasicTextField';
import CommentRegister from './CommentRegister';
import CommentItem from './CommentItem';

const CommentList = () => {
    return (
        <div className="CommentList">
            <div className="list_wrapper">
                <CommentItem />
            </div>

            <CommentRegister />
        </div>
    );
};

export default CommentList;