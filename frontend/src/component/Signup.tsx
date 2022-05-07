import React from 'react';
import {
  Button,
  TextField,
  Grid,
  Paper,
  AppBar,
  Typography,
  Toolbar
} from '@material-ui/core';
import styles from './Login.module.css';
import { useForm } from '../hooks/useForm';
import { signupCustomer } from '../action/IssueActions';
import { useNavigate, Link } from 'react-router-dom';
const Signup:React.FC = () => {
  const navigate = useNavigate();
  const { formData, handleInputChange, emptyForm } = useForm(
    {
      name: '',
      password: ''
    }
  );
  const { name, password } = formData;

  const signup = async () => {
    const signupData = await signupCustomer(formData);
    if (signupData) {
      navigate('/login');
      emptyForm();
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
                            <Typography component="h1" variant="h5">
                            Sign UP
                            </Typography>
                        </Grid>
                    <Grid item>
                    <form >
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
                                onClick={signup}
                                >
                                Submit
                                </Button>
                            </Grid>
                            <Grid item>
                                <Link to='/'><Typography>Login</Typography></Link>
                            </Grid>
                        </Grid>
                    </form>
                    </Grid>
                    </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </div>
      </>
  );
};

export default Signup;
