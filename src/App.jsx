import React from 'react';
import { useContext } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile.jsx';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './Store/auth-context.jsx';
import './App.css';  

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path='/' exact>
            <HomePage/>
          </Route>
          {!authCtx.isLoggedIn && (
            <Route path='/auth'>
              <AuthPage/>
            </Route>
          )}
          <Route path='/profile'>
            {authCtx.isLoggedIn && <UserProfile/>}
            {!authCtx.isLoggedIn && <Redirect to='/auth'/>}
          </Route>
          <Route path='*'>
            <Redirect to='/'/>
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
