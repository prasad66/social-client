import './App.css';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AuthContext, AuthContextProvider } from './context/AuthContext';
import { useContext } from 'react';

function App() {

  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Login />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/profile/:username">

          {user ? <Profile /> : <Login />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
