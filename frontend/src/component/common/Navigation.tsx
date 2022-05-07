import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../contextAPI/context';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navlinks: {
      marginLeft: theme.spacing(10),
      display: 'flex'
    },
    logo: {
      flexGrow: 1,
      cursor: 'pointer'
    },
    link: {
      textDecoration: 'none',
      color: 'white',
      fontSize: '20px',
      marginLeft: theme.spacing(20),
      '&:hover': {
        color: 'yellow',
        borderBottom: '1px solid white'
      }
    }
  })
);

const Navigation:React.FC = () => {
  const { customer, loginCustomer } = useGlobalContext();
  const navigate = useNavigate();
  const classes = useStyles();
  // useEffect(() => {

  // }, []);

  // const onClick = () => {

  // };

  const logout = () => {
    loginCustomer(null);
  };
  return (
      <div>

        <AppBar position="static">
          <CssBaseline />
          <Toolbar>
            <Typography variant="h4" className={classes.logo}>
              MERN
            </Typography>
              <div className={classes.navlinks}>
                <Link to="/orders" className={classes.link}>
                  Orders
                </Link>
                {customer && <Link to="/create" className={classes.link}>
                  Create
                </Link>}
                <Link onClick={logout} to="/" className={classes.link}>
                  Logout
                </Link>
              </div>
          </Toolbar>
        </AppBar>
      </div>

  );
};

export default Navigation;
