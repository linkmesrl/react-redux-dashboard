import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'actions';
import { ThemeProvider } from 'styled-components';
import { theme } from 'components';

import { Page } from 'hedron';
import { NavigationLink, Navigation, Section } from 'components';

class App extends Component {
  componentDidMount() {
    this.props.loadPlugins();
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Navigation title={'React Redux Dashboard'}>
            <NavigationLink to={"/dashboard/home"}>Home</NavigationLink>
            <NavigationLink to={"/dashboard/demo"}>Demo</NavigationLink>
          </Navigation>
          <Section padding={'40px 0'}>
            <Page width={'1170px'}>
              {this.props.children}
            </Page>
          </Section>
        </div>
      </ThemeProvider>
    );
  }
}

export default connect(
  state => ({}),
  dispatch => bindActionCreators(
    { ...actions },
    dispatch
  )
)(App);
