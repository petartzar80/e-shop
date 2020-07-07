import styled, { ThemeProvider } from 'styled-components';

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

const Page = props => {
  return (
    <ThemeProvider theme={theme}>
      <StyledPage>
        <Meta />
        <Header />
        <Inner>{props.children}</Inner>
      </StyledPage>
    </ThemeProvider>
  );
};

export default Page;
