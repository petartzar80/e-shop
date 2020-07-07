import Link from 'next/link';
import styled from 'styled-components';

import Nav from './Nav';

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 0.4rem;
  position: relative;
  z-index: 2;
  line-height: 1;
  a {
    color: black;
    text-transform: uppercase;
    text-decoration: none;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
  margin-top: 0;
  margin-bottom: 0;
`;

const StyledHeader = styled.header`
  .bar {
    padding: 1rem;
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
  }
`;

const Header = () => (
  <StyledHeader>
    <div className="bar">
      <Logo>
        <Link href="/">
          <a>Transistore</a>
        </Link>
      </Logo>
      <Nav />
    </div>
    <div className="sub-bar">
      <p>Search</p>
    </div>
    <div>Cart</div>
  </StyledHeader>
);

export default Header;
