import React, { useState } from 'react';
import {
  Button,
  TextField,
  Grid,
  Paper,
  AppBar,
  Typography,
  Toolbar,
  Tabs,
  Tab
} from '@material-ui/core';
import styles from './Login.module.css';
import { useForm } from '../hooks/useForm';
import { loginCustomer, loginManager } from '../action/IssueActions';
import { useNavigate, Link } from 'react-router-dom';
import { useGlobalContext } from '../contextAPI/context';
const Login:React.FC = () => {
  const navigate = useNavigate();
  const { customerLogin, managerLogin } = useGlobalContext();
  const [loginOption, setloginOption] = useState(0);
  const handleTabs = (event: React.ChangeEvent<any>, newValue: number) => {
    setloginOption(newValue);
  };
  const { formData, handleInputChange, emptyForm } = useForm(
    {
      name: '',
      password: ''
    }
  );
  const { name, password } = formData;

  const login = async (e:any) => {
    e.preventDefault();
    if (loginOption === 0) {
      const loginData = await loginCustomer(formData);
      if (loginData) {
        customerLogin(loginData);
        emptyForm();
        navigate('/orders');
      } else {
        emptyForm();
        navigate('/signup');
      }
    } else {
      const loginData = await loginManager(formData);
      if (loginData) {
        managerLogin(loginData);
        emptyForm();
        navigate('/orders');
      } else {
        emptyForm();
        navigate('/signup');
      }
    }
  };
  return (
      <>
    <div>
        <AppBar position="static" color="primary">
        <Toolbar>
        <Grid container justify="center" wrap="wrap">
        <Grid item>
        <Typography variant="h6">{'MERN'}</Typography>
        </Grid>
        </Grid>
        </Toolbar>
        </AppBar>
        <Grid container spacing={0} justify="center" direction="row">
        <Grid item>
        <Grid
        container
        direction="column"
        justify="center"
        spacing={2}
        className={styles.loginForm}
        >
        <Paper
        variant="elevation"
        elevation={2}
        className={styles.loginBackground}
        >
        <Grid item>
        <Paper square>
          <Tabs
            value={loginOption}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleTabs}
            aria-label="disabled tabs example"
          >
          <Tab label="Customer" />
          <Tab label="Manager" />
        </Tabs>
      </Paper>
        </Grid>
        <Grid item style={{ padding: '30px 0' }}>
        <Typography component="h1" variant="h5">
        Sign in
        </Typography>
        </Grid>
        <Grid item>
        <div >
        <Grid container direction="column" spacing={2}>
        <Grid item>
        <TextField
        type="text"
        placeholder="Name"
        fullWidth
        name="name"
        variant="outlined"
        required
        autoFocus
        value={name}
        onChange={handleInputChange}
        />
        </Grid>
        <Grid item>
        <TextField
        type="password"
        placeholder="Password"
        fullWidth
        name="password"
        variant="outlined"
        required
        value={password}
        onChange={handleInputChange}
        />
        </Grid>
        <Grid item>
        <Button
        variant="contained"
        color="primary"
        type="submit"
        className={styles.buttonBlock}
        onClick={login}
        >
        Submit
        </Button>
        </Grid>
        {loginOption === 0 && <Grid item>
            <Link to='/signup'><Typography>Sign up</Typography></Link>
        </Grid>}
        </Grid>
        </div>
        </Grid>
        </Paper>
        </Grid>
        </Grid>
        </Grid>
        </div>
      </>
  );
};

export default Login;
