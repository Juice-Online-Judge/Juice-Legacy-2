import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';

import { actions as authActions } from '../../redux/modules/auth';

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class HomeView extends React.Component {
  static propTypes = {
    loginState: PropTypes.object.isRequired,
    fetchUserInfo: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchUserInfo();
  }

  get rightMenu() {
    if (this.props.loginState.get('state')) {
      return (
        <IconMenu
          iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
          }
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}} >
          <MenuItem primaryText='Logout' />
        </IconMenu>
      );
    } else {
      return (
        <Link to='/signin'>
          <FlatButton labelStyle={{ color: 'white' }} label='Signin' />
        </Link>
      );
    }
  }

  render() {
    return (
      <AppBar
        title='Juice'
        iconElementRight={ this.rightMenu } />
    );
  }
}

export default connect((state) => {
  return {loginState: state.auth};
}, authActions)(HomeView);
