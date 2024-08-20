import PostEditor from './components/PostEditor';
import PostList from './components/PostList';


const mem_dummy ={
    memberId: 1,
    nickname: 2,
    countryId: 1,
};

export default function NewPost(props) {
    return(
        <div>
            <PostEditor
                type={'register'}
                member ={mem_dummy}
            ></PostEditor>
        </div>
    );
}