import React, { PropTypes } from 'react';

import AppBar from 'components/AppBar';

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class HomeView extends React.Component {
  render() {
    return (
      <AppBar />
    );
  }
}
