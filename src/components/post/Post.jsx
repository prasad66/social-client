import { MoreVert } from '@mui/icons-material';
import { useContext, useEffect, useState } from 'react';
import { format } from 'timeago.js'
import { Link } from 'react-router-dom';
import { AuthContext } from './../../context/AuthContext';
import axios from 'axios';
import './Post.css';

const Post = ({ post }) => {

    const { user: currentUser } = useContext(AuthContext);

    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});

    const PF = process.env.REACT_APP_PUBLIC_URL;

    const likeHandler = () => {
        try {
            const response = axios.put('https://social-mda.herokuapp.com/api/posts/like/' + post._id, { userId: currentUser.user._id });
            console.log(response);
        } catch (err) {
            console.log(err);
        }
        setLike(prev => !isLiked ? prev + 1 : prev - 1);
        setIsLiked(!isLiked);
    }

    useEffect(() => {

        setIsLiked(post.likes.includes(currentUser.user._id));

    }, [currentUser.user._id, post.likes]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get(`https://social-mda.herokuapp.com/api/users?userId=${post.userId}`);
            setUser(response.data?.user);
        }

        fetchPosts();
    }, [post.userId]);


    const profilePic = user?.profilePicture ? PF + user.profilePicture : PF + 'person/noAvatar.png';
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user.username}`}>
                            <img className="postProfileImg" src={profilePic} alt="" />
                        </Link>
                        <span className="postUsername">{user?.username}</span>
                        <span className="postDate">{format(post?.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className="postImg" src={PF + post.img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src="./../../assets/like.png" onClick={likeHandler} alt="" />
                        <img className="likeIcon" src="./../../assets/heart.png" onClick={likeHandler} alt="" />
                        <span className="postLikeCounter">{like} people likes it</span>
                    </div>
                    <div className="postBottomRight">
                        <div className="postCommentText">
                            {post?.comment} comments
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post