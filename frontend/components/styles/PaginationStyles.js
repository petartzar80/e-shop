import styled from 'styled-components';

const PaginationStyles = styled.div`
  text-align: center;
  display: inline-grid;
  grid-template-columns: auto 16rem 6rem 16rem auto;
  align-items: stretch;
  justify-content: center;
  align-content: center;
  margin: 2rem 0;
  p {
    align-self: center;
    font-family: 'robotomono-r';
  }
  .prev,
  .next {
    color: black;
    font-size: 3rem;
  }
  .pages {
    text-align: right;
    padding-right: 0;
  }
  .items {
    text-align: left;
    padding-left: 0;
  }
  & > * {
    margin: 0;
    padding: 15px 30px;
  }
  a[aria-disabled='true'] {
    color: grey;
    pointer-events: none;
  }
`;

export default PaginationStyles;
