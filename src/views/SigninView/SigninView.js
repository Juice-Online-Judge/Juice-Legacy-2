import React, { PropTypes } from 'react';
import Radium from 'radium';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';

import { actions as loginActions } from '../../redux/modules/auth';
import { routeActions } from 'redux-simple-router';

import Paper from 'material-ui/lib/paper';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardActions from 'material-ui/lib/card/card-actions';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import Theme from 'material-ui/lib/styles/theme-decorator';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';

let theme = ThemeManager.getMuiTheme(LightRawTheme);
let { push } = routeActions;

@Radium
@Theme(theme)
@connect((state) => {
  return {loginState: state.auth};
}, Object.assign({}, loginActions, { push }))
class SigninView extends React.Component {
  static propTypes = {
    push: PropTypes.func.isRequired,
    loginState: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    setLoginState: PropTypes.func.isRequired
  };

  constructor(...args) {
    super(...args);
    this.state = {
      username: '',
      password: ''
    };
  }

  componentDidMount() {
    this.checkLoginState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.checkLoginState(nextProps);
  }

  checkLoginState(props) {
    if (props.loginState) {
      props.push('/');
    }
  }

  @autobind
  setUsername(event) {
    this.setState({username: event.target.value});
  }

  @autobind
  setPassword(event) {
    this.setState({password: event.target.value});
  }

  @autobind
  login(event) {
    let { username, password } = this.state;
    event.preventDefault();
    this.props.login(username, password);
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.flexContainer}>
          <Paper zDepth={3} style={styles.paper}>
            <Card>
              <CardTitle style={styles.flexContainer} title='Juice' />
              <CardActions style={styles.flexContainer}>
                <TextField style={styles.action}
                  onChange={ this.setUsername }
                  floatingLabelText='Username' />
              </CardActions>
              <CardActions style={styles.flexContainer}>
                <TextField style={styles.action}
                  type='password'
                  onChange={ this.setPassword }
                  floatingLabelText='Password' />
              </CardActions>
              <CardActions style={styles.flexContainer}>
                <FlatButton label='Login' primary onClick={ this.login } />
              </CardActions>
            </Card>
          </Paper>
        </div>
      </div>
    );
  }
}

export default SigninView;

let styles = {
  container: {
    height: '100%',
    width: '100%'
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    width: '40%',
    height: '40%'
  },
  action: {
    width: '80%'
  }
};