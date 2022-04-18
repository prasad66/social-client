import './Topbar.css'
import { Search, Person, Chat, Notifications } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { AuthContext } from './../../context/AuthContext';
import { useContext } from 'react';

const Topbar = () => {


    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_URL;
    console.log(user)

    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <span className="logo">
                    <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                        PVTMedia
                    </Link>
                </span>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className="searchIcon" />
                    <input type="text" placeholder="Search for friend, post or video" className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <div className="topbarLink">Home</div>
                    <div className="topbarLink">Timeline</div>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <Link to={`/profile/${user.user.username}`}>
                    <img src={user.profilePicture ? PF + user.profilePicture : PF + 'person/noAvatar.png'} alt="" className="topbarImg" />
                </Link>
            </div>
        </div>
    )
}

export default Topbar