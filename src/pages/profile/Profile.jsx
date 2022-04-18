import './Profile.css'
import Topbar from './../../components/topbar/Topbar';
import Sidebar from './../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';



const Profile = () => {

  const { username } = useParams();

  const PF = process.env.REACT_APP_PUBLIC_URL;

  const [user, setUser] = useState({});
  useEffect(() => {

    const fetchPosts = async () => {
      const response = await axios.get(`/users/?username=${username}`);
      setUser(response.data?.user);
    }

    fetchPosts();
  }, [username]);

  const { user: currentUser } = useContext(AuthContext);
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture ? PF + user.coverPicture : PF + 'person/noCover.png'}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilePicture ? PF + user.profilePicture : PF + 'person/noAvatar.png'}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile