import styled from 'styled-components';

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 2rem;
  a,
  button {
    padding: 0 0.5rem;
    display: flex;
    align-items: center;
    position: relative;
    color: black;
    font-family: 'roboto';
    font-weight: 900;
    font-size: 1.2em;
    background: none;
    border: 0;
    line-height: 1;
    cursor: pointer;
    &:hover,
    &:focus {
      background-color: ${props => props.theme.lemon};
    }
    @media (max-width: 700px) {
      font-size: 10px;
      padding: 0 10px;
    }
  }
  @media (max-width: 1300px) {
    width: 100%;
    justify-content: center;
    font-size: 1.3rem;
  }
`;

export default NavStyles;
