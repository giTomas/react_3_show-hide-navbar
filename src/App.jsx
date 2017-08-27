import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import throttle from 'lodash.throttle';
import actionCreators from './redux/actionCreators';
import Page from './styled/page';

class App extends PureComponent {

  componentDidMount() {
    window.addEventListener('scroll', throttle(this.handleScroll, 250), false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', throttle(this.handleScroll, 250), false);
  }

  handleScroll = () => {
    this.props.updateUIStatus(window.scrollY);
  }

  render() {
    return (
      <Page
        scrollUp={this.props.scrollUp}
        scrollDown={this.props.scrollDown}
        showElement={this.props.showElement}
      />
    );
  }
}

const mapStateToProps = state => ({
  scrollUp: state.scrollUp,
  scrollDown: state.scrollDown,
  showElement: state.showElement,
});

const mapDispatchToProps = dispatch => ({
  updateUIStatus: scrollY => {
    dispatch(actionCreators.updateUIStatus(scrollY));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
