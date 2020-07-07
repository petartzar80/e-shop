import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

import Header from './Header';
import Meta from './Meta';

const theme = {
  black: '#000000',
  white: '#FFFFFF',
  lemon: '#f9ed43',
  lyon: '#1c4386',
  maxWidth: '1000px',
  bs: 'none',
};

const StyledPage = styled.div`
  background: ${props => props.theme.white};
  color: ${props => props.theme.black};
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'roboto';
    src: url('Roboto-Regular.ttf');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'roboto-li';
    src: url('Roboto-LightItalic.ttf');
    font-weight: 300;
    font-style: italic;
  }
  @font-face {
    font-family: 'roboto-ti';
    src: url('Roboto-ThinItalic.ttf');
    font-weight: 100;
    font-style: italic;
  }
  @font-face {
    font-family: 'robotomono-l';
    src: url('RobotoMono-Light.ttf');
    font-weight: 300;
    font-style: normal;
  }
  @font-face {
    font-family: 'robotomono-r';
    src: url('RobotoMono-Regular.ttf');
    font-weight: normal;
    font-style: normal;
  }
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'roboto';
    background: white;
  }
  a {
    text-decoration: none;
    color: black;
  }
`;

const Page = props => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <StyledPage>
        <Meta />
        <Header />
        <Inner>{props.children}</Inner>
      </StyledPage>
    </ThemeProvider>
  );
};

export default Page;
