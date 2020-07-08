import styled from 'styled-components';

const Item = styled.div`
  background: white;
  position: relative;
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    margin-bottom: 30px;
  }
  p {
    line-height: 1;
    font-weight: 300;
    flex-grow: 1;
    font-size: 3rem;
    color: ${props => props.theme.black};
    margin: 0;
    margin-bottom: 15px;
    text-align: left;
  }
  p,
  .edit {
    color: ${props => props.theme.black};
  }
  button,
  .edit {
    font-family: 'robotomono-r';
    font-weight: 300;
    cursor: pointer;
  }
  .cardFooter {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .icons {
    display: flex;
    align-items: center;
    button {
      background: transparent;
      border: 0;
    }
  }
  .buttonList {
    margin-top: 20px;
    border-bottom: 2px solid ${props => props.theme.lyon};
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    background: white;
    & > * {
      background: white;
      border: 0;
      font-size: 1.5rem;
      padding: 1rem;
      &:hover,
      &:focus {
        background-color: ${props => props.theme.lemon};
      }
    }
  }
`;

export default Item;
