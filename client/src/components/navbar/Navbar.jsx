import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Box, Typography } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { TemplateContext } from '../../template/TemplateProvider';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavbarButton from './NavbarButton';

import useStyles from './styles';

const Navbar = () => {
  const classes = useStyles();

  const ctx = useContext(TemplateContext);
  const dispatch = useDispatch();

  useEffect(() => {
  }, [ctx?.user]);

  return (
    <main>
    <AppBar position="static" className={classes.appbar} color="inherit">
      <Toolbar className={classes.toolbar}>
        <Box className={classes.logo}>
          <Box className={classes.imgText}>
            <Typography variant="h4">PCR Test</Typography>
          </Box>
          <Box className={classes.imgLogo}>
          <Typography variant="h4"></Typography>
          </Box>
        </Box>
        <NavbarButton />
      </Toolbar>
      <ToastContainer />
    </AppBar>
    </main>
  );
};

export default Navbar;
