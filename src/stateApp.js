import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import throttle from 'lodash.throttle';

const Wrapper = styled.div`
  height: 250vh;
  background-color: #F46524;
`;

const Container = styled.div`
  --font-size: 2em;
`;

const Intro = styled.h2`
  font-size: var(--font-size);
  font-weight: normal;
  color: white;
  line-height: var(--line-height);
`;

const CallToAction = styled.h3`
  font-size: var(--font-size);
  font-weight: normal;
  color: black;
  line-height: var(--line-height);
`;

const Instructions = styled.h4`
  font-size: var(--font-size);
  font-weight: normal;
  white-space: nowrap;
  display: block;
  line-height: var(--line-height);
  color: white;
`;

const ScrollDirectionIndicator = styled.span.attrs({
  active: props => props.active ? 'black' : 'white',
})`
  color: ${props => props.active}
`;

const NavContainer = styled.div.attrs({
  transform: props => props.hide ? '0' : '-100%',
})`
  transform: translateY(${props => props.transform});
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background-color: black;
  transition: transform 0.5s ease-out;
  z-index: 1000;
`;

const ContentContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding-left: 1em;
  padding-right: 1em;
`;

const FlexContainer = ContentContainer.extend`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  padding-top: 1em;
  padding-bottom: 1em;
`;

const NavTitle = styled.h1`
  color: white;
  font-size: 2em;
  font-weight: normal;
`;

const Navigation = styled.ul`
  display: flex;
  list-style: none;
  li + li {
    margin-left: 0.75em
  }
`;

const NavigationItems = styled.li`
  font-size: 1em;
  color: white;
`;

const Section = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;

`;

const Page = ({scrollDown, scrollUp, showElement}) => (
  <Wrapper>
    <NavContainer hide={showElement}>
      <FlexContainer>
        <NavTitle>NavBar</NavTitle>
        <Navigation>
          <NavigationItems>Home</NavigationItems>
          <NavigationItems>About</NavigationItems>
          <NavigationItems>Contact</NavigationItems>
        </Navigation>
      </FlexContainer>
    </NavContainer>
    <ContentContainer>
        <Section>
          <Container>
            <Intro>Show/Hide navigation bar. Built with React and Styled Components.</Intro>
            <CallToAction>Let's try it!</CallToAction>
            <Instructions>
              Scroll down<ScrollDirectionIndicator active={scrollDown}>&#8595;</ScrollDirectionIndicator>
            </Instructions>
            <Instructions>
              Scroll Up<ScrollDirectionIndicator active={scrollUp}>&#8593;</ScrollDirectionIndicator>
            </Instructions>
          </Container>
        </Section>
      </ContentContainer>
  </Wrapper>
);

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: 0,
      scrollDown: false,
      scrollUp: false,
      showElement: true
    }

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', throttle(this.handleScroll, 250), false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', throttle(this.handleScroll, 250), false);
  }

  handleScroll() {
    const scrollY = window.scrollY;
    this.setState((prevState) => ({
      scrollY,
      showElement: prevState.scrollY >= scrollY,
      scrollDown: prevState.scrollY < scrollY,
      scrollUp: prevState.scrollY > scrollY,
    }))
  }

  render() {
    return (
      <Page
        scrollUp={this.state.scrollUp}
        scrollDown={this.state.scrollDown}
        showElement={this.state.showElement}
      />
    );
  }
}

export default App;
