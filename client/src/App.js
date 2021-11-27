import React, { useContext,  } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import { Dashboard, Welcome, Auth } from './pages';
import { TemplateContext } from './template/TemplateProvider';
import { Grid } from '@mui/material';



const App = () => {
  const ctx = useContext(TemplateContext);

  return (
    <Grid>
      <BrowserRouter>
        {ctx.user ? '' : <Navbar />}
        <Switch>
          <Route exact path="/" component={() => (!ctx.user ? <Redirect to='/user/login' /> : <Redirect to="/main"/>)} />
          <Route path="/main" render={() => (ctx.user ? (<Dashboard />) : (<Redirect to="/"/>))}/>
          <Route path="/user/:signin" component={() => (ctx.user ? <Redirect to='/main' /> : <Auth />)} />
        </Switch>
      </BrowserRouter>
    </Grid>
  )
}


export default App;
          