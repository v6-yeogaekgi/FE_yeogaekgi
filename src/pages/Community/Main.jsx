import PostList from './components/PostList'
import PostNav from './components/PostNav'


export default function Main(props) {
    return(
        <div>
            <PostNav></PostNav>
            <PostList>
            </PostList>
        </div>
    );
}

