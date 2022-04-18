import { useContext, useEffect, useState } from 'react';
import Post from '../post/Post'
import Share from '../share/Share'
import './Feed.css'
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Feed = ({ username }) => {

  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = username
        ? await axios.get('https://social-mda.herokuapp.com/api/posts/profile/' + username)
        : await axios.get('https://social-mda.herokuapp.com/api/posts/timeline/' + user.user._id);
      setPosts(response.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }));
    }

    fetchPosts();
  }, [username, user.user._id]);

  return (
    <div className="feedContainer">
      <div className="feedWrapper">
        {
          (!username || username === user.user.username) && <Share />
        }
        {
          posts.map(post => (
            <Post key={post._id} post={post} />
          ))
        }
      </div>
    </div>
  )
}

export default Feed