import PostEditor from './components/PostEditor';
import PostList from './components/PostList';


export default function EditPost() {
    // 게시글 상세 조회 api
    const post = {

        postId: 1,
        memberId: 1,
        nickname: "settong",
        images : [],
        content: "adkjflajskjkjkjkjsdf jkj\nakjsdf;kajsfkajsfkjs\njaljsdfajsdfjlasjfj\nadkjflajskjkjkjkjsdf jkj\nakjsdf;kajsfkajsfkjs\njaljsdfajsdfjlasjfj\nadkjflajskjkjkjkjsdf jkj\nakjsdf;kajsfkajsfkjs\njaljsdfajsdfjlasjfj\nadkjflajskjkjkjkjsdf jkj\nakjsdf;kajsfkajsfkjs\njaljsdfajsdfjlasjfj\nadkjflajskjkjkjkjsdf jkj\nakjsdf;kajsfkajsfkjs\njaljsdfajsdfjlasjfj\n",
        hashtag: "안녕하세요",
        likeCnt: 12412,
        commentCnt: 1234,
        regGate : "2024-08-14",
        modDate: "2024-08-14",
        likeState: 0,

    }
    const member ={
        memberId: 1,
        nickname: "settong",
        countryId: 1,
    };


    return(

        <div>
            <PostEditor
                type={'modify'}
                post={post}
                member ={member}
            ></PostEditor>
        </div>
    );
}