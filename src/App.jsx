import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile.jsx';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import './App.css';  

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path='/' exact>
            <HomePage/>
          </Route>
          <Route path='/auth' >
            <AuthPage/>
          </Route>
          <Route path='/profile'>
            <UserProfile/>
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
