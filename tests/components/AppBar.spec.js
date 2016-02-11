import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { bindActionCreators } from 'redux';
import { fromJS } from 'immutable';
import { AppBar } from 'components/AppBar';
import MenuItem from 'material-ui/lib/menus/menu-item';

function shallowRender(component) {
  const renderer = TestUtils.createRenderer();

  renderer.render(component);
  return renderer.getRenderOutput();
}

function renderWithProps(props = {}) {
  return TestUtils.renderIntoDocument(<AppBar {...props} />);
}

function shallowRenderWithProps(props = {}) {
  return shallowRender(<AppBar {...props} />);
}

describe('AppBar', () => {
  let _spies;
  let _props;
  let _component;
  let _rendered;

  context('when loginState not valid', () => {
    let initialState = fromJS({
      valid: false,
      state: false,
    });

    beforeEach(() => {
      _spies = {};
      _props = {
        loginState: initialState,
        ...bindActionCreators({
          fetchUserInfo: (_spies.fetchUserInfo = sinon.spy()),
          logout: (_spies.logout = sinon.spy())
        }, _spies.dispatch = sinon.spy())
      };

      _component = shallowRenderWithProps(_props);
      _rendered = renderWithProps(_props);
    });

    it('Should fetch user info', () => {
      _spies.fetchUserInfo.should.have.been.called;
    });
  });
});
