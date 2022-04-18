import './Rightbar.css';
import { Users } from '../../dummy'
import Online from '../online/Online';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from './../../context/AuthContext';
import { Add, Remove } from '@mui/icons-material';


const Rightbar = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_URL;

  const [friends, setFriends] = useState([]);

  const { user: currentUser, dispatch } = useContext(AuthContext);

  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    setFollowed(currentUser.user.following.includes(user?._id))
  }, [currentUser, user?._id]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendsList = user?._id && await axios.get(`/users/friends/${user?._id}`);
        setFriends(friendsList.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [user?._id]);

  const followHandler = async () => {
    // try {

    //   if (followed) {
    //     await axios.put(`/users/unfollow/${user?._id}`, { userId: currentUser.user._id });
    //     dispatch({ type: 'UNFOLLOW', payload: user?._id });
    //   }
    //   else {
    //     await axios.put(`/users/follow/${user?._id}`, { userId: currentUser.user._id });
    //     dispatch({ type: 'FOLLOW', payload: user?._id });
    //   }
    //   setFollowed(!followed);

    // } catch (error) {
    //   console.log(error);
    // }
    try {
      if (followed) {
        await axios.put(`/users/unfollow/${user._id}`, {
          userId: currentUser.user._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/follow/${user._id}`, {
          userId: currentUser.user._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }
  }


  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="./../../assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Ram</b> and <b> 3 others </b> friends have birthday today
          </span>
        </div>
        <img src="./../../assets/ad.png" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendsList">
          {
            Users.map((user, index) => (
              <Online key={user.id} user={user} />
            ))
          }
        </ul>
      </>
    );
  }

  console.log(followed);
  const ProfileRightbar = () => {

    return (
      <>
        {
          user?.username !== currentUser.user.username &&
          <button className="rightbarFollowButton" onClick={followHandler}>

            {
              followed ? 'Unfollow ' : 'Follow'
            }
            {
              followed ? <Remove /> : <Add />
            }
          </button>

        }
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship === 1 ? 'Single' : user.relationship === 2 ? 'Maried' : ''}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          {
            friends.map((friend, index) => (
              <Link to={`/profile/${friend.username}`} key={friend._id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="rightbarFollowing" >
                  <img src={friend.profilePicture ? PF + friend.profilePicture : PF + 'person/noAvatar.png'} alt="" className="rightbarFollowingImg" />
                  <span className="rightbarFollowingName">{friend?.username}</span>
                </div>
              </Link>
            ))
          }
        </div>
      </>);
  }
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {
          user ? <ProfileRightbar /> : <HomeRightbar />
        }
      </div>
    </div>
  )
}

export default Rightbar