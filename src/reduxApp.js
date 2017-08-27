import React, { PureComponent } from 'react';
import styled from 'styled-components';
import throttle from 'lodash.throttle';
import { connect } from 'react-redux';
import actionCreators from './actionCreators';

const Wrapper = styled.div`
  height: 800vh;
  background-color: aquamarine;
  background-image: repeating-linear-gradient(-45deg, transparent, transparent 15px, rgba(255,255,255,1) 15px, rgba(255,255,255,1) 30px);
`;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255,255,255,0.65);
  padding: .5em 1.5em;
`;

const ScrollYIndicator = styled.h2`
  font-size: 5em;
  font-weight: normal;
  ${'' /* position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */}
  white-space: nowrap;
  display: block;
`;

const ScrollDirectionIndicator = styled.h3`
  font-size: 3em;
  font-weight: normal;
  white-space: nowrap;
  display: block;
`;

const Grey = styled.span`
  color: grey;
`;

const Scroll = ({scrollY, scrollDirection}) => (
  <Wrapper>
    <Container>
      <ScrollYIndicator>
        <Grey>scrollY</Grey> { scrollY }px
      </ScrollYIndicator>
      <ScrollDirectionIndicator>
        <Grey>Scroll Direction:</Grey> {scrollDirection}
      </ScrollDirectionIndicator>
    </Container>
  </Wrapper>
);

class App extends PureComponent {
  constructor(props) {
    super(props);

    // this.state = {
    //   scrollY: 0,
    //   scrollDown: false,
    //   scrollUp: false,
    //   scrollDirection: 'None',
    // }

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', throttle(this.handleScroll, 150), false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', throttle(this.handleScroll, 150), false);
  }

  handleScroll() {
    const scrollY = window.scrollY;
    // this.setState((prevState) => ({
    //   scrollY,
    //   scrollDown: prevState.scrollY < scrollY,
    //   scrollUp: prevState.scrollY > scrollY,
    //   scrollDirection: prevState.scrollY < scrollY ?
    //   'Down' : 'Up',
    // }))
    this.props.updateScrollStatus(scrollY);
  }

  handleOnScroll() {
    console.log('scroll');
  }

  render() {
    return (
      <Scroll
        scrollY={this.props.scrollY}
        scrollDirection={this.props.scrollDirection}
      />
    );
  }
}

const mapStateToProps = state => ({
  scrollY: state.scrollY,
  scrollDown: state.scrollDown,
  scrollUp: state.scrollUp,
  scrollDirection: state.scrollDirection,
});

const mapDispatchToProps = dispatch => ({
  updateScrollStatus: (scrollY) => {
    dispatch(actionCreators.updateScrollStatus(scrollY));
  },
  // updateScrollY: (scrollY) => {
  //   dispatch(actionCreators.updateScrollY(scrollY));
  // },
  // updateScrollDown: (scrollDown) => {
  //   dispatch(actionCreators.updateScrollDown(scrollDown));
  // },
  // updateScrollUp: (scrollUp) => {
  //   dispatch(actionCreators.updateScrollUp(scrollUp));
  // },
  // updateScrollDirection: (scrollDirection) => {
  //   dispatch(actionCreators.updateScrollDirection(scrollDirection));
  // },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
