import React, { Component } from 'react';
import './Login.css';
import { withStyles } from '@material-ui/core/styles';
import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import indigo from '@material-ui/core/colors/indigo';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    card: {
        maxWidth: '25%',
        margin: 'auto',
        marginTop: 15,
        padding: 40,
    },
    loginForm: {
        width: '100%',
        marginTop: 20,
    },
    inputLabel: {
        '&$inputFocused': {
            color: indigo[500],
        },
    },
    inputFocused: {},
    inputUnderline: {
        '&:after': {
            borderBottomColor: indigo[500],
        },
    },
});

class Login extends Component {

    constructor() {
        super();
        this.state = {
            loginUsername: '',
            usernameRequired: false,
            loginPassword: '',
            passwordRequired: false,
            incorrectCredentials: false,
        }
    }

    inputUsernameChangeHandler = (event) => {
        this.setState({ loginUsername: event.target.value })
    }

    inputPasswordChangeHandler = (event) => {
        this.setState({ loginPassword: event.target.value })
    }

    loginOnClickHandler = () => {
        this.state.loginUsername === '' ? this.setState({ usernameRequired: true, incorrectCredentials: false }) : this.setState({ usernameRequired: false });
        this.state.loginPassword === '' ? this.setState({ passwordRequired: true, incorrectCredentials: false }) : this.setState({ passwordRequired: false });

        if (this.state.loginUsername && this.state.loginPassword) {
            // use mock username and password for log in
            let username = 'user';
            let password = '123';
            let accessToken = '8661035776.d0fcd39.87fd934e04f84253aaf234d8bd4e4c65';
            if (username === this.state.loginUsername && password === this.state.loginPassword) {
                sessionStorage.setItem('access-token', accessToken);
                this.props.history.push('/home');
            } else {
                this.setState({ incorrectCredentials: true })
            }
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>

                {/* header */}
                <Header />

                {/* login card */}
                <Card className={classes.card}>
                    <CardContent>

                        {/* login heading*/}
                        <Typography variant='h5'>
                            LOGIN
                        </Typography>

                        {/* username */}
                        <FormControl required className={classes.loginForm}>
                            <InputLabel
                                htmlFor='loginUsername'
                                classes={{
                                    root: classes.inputLabel,
                                    focused: classes.inputFocused,
                                }}
                            >
                                Username
                            </InputLabel>
                            <Input
                                id='loginUsername'
                                type='text'
                                loginusername={this.state.loginUsername}
                                classes={{
                                    underline: classes.inputUnderline,
                                }}
                                onChange={this.inputUsernameChangeHandler}
                            />
                            {this.state.usernameRequired ?
                                <FormHelperText error={true}>
                                    <span className='red'>required</span>
                                </FormHelperText>
                                : ''
                            }
                        </FormControl>

                        {/* password */}
                        {/* form is used to overcome - [DOM] Password field is not contained in a form: (More info: https://goo.gl/9p2vKq) */}
                        <form>
                            <FormControl required className={classes.loginForm}>
                                <InputLabel
                                    htmlFor='loginPassword'
                                    classes={{
                                        root: classes.inputLabel,
                                        focused: classes.inputFocused,
                                    }}
                                >
                                    Password
                            </InputLabel>
                                <Input
                                    autoComplete='off'
                                    id='loginPassword'
                                    type='password'
                                    loginpassword={this.state.loginPassword}
                                    classes={{
                                        underline: classes.inputUnderline,
                                    }}
                                    onChange={this.inputPasswordChangeHandler}
                                />
                                {this.state.passwordRequired ?
                                    <FormHelperText error={true}>
                                        <span className='red'>required</span>
                                    </FormHelperText>
                                    : ''
                                }
                            </FormControl>
                        </form>

                        {/* incorrect credentials error */}
                        {this.state.incorrectCredentials ?
                            <FormControl>
                                <FormHelperText error={true}>
                                    <span className='red'>Incorrect username and/or password</span>
                                </FormHelperText>
                            </FormControl>
                            : ''
                        }
                        <br /><br />

                        {/* login button */}
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={this.loginOnClickHandler}
                        >
                            LOGIN
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(Login);
