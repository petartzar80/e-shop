import styled from 'styled-components';

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-auto-flow: column;
  min-height: 600px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 3rem;
    font-size: 3rem;
    text-align: center;
    p {
      margin: 0 auto;
      line-height: 1.3;
    }
  }
  .title {
    text-transform: uppercase;
  }
  .details .description {
    margin-bottom: 3rem;
  }
  .details .long-description {
    font-size: 1.5rem;
    margin-bottom: 3rem;
    text-align: justify;
  }
`;

export default SingleItemStyles;
