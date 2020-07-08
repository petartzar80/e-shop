import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  from {
    background-position: 0 0;
  }
  to {
    background-position: 100% 100%;
  }
`;

const Form = styled.form`
  background: white;
  color: black;
  padding: 20px;
  padding-top: 0;
  font-size: 2.4rem;
  line-height: 1.5;
  font-weight: 400;
  label {
    display: block;
    margin-bottom: 1rem;
    text-align: left;
  }
  input,
  select {
    width: 100%;
    height: 4rem;
    padding: 0.5rem;
    font-size: 1rem;
    border: 0;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    background: white;
    font-family: 'robotomono-r';
    font-size: 1.5rem;
    &:focus {
      outline: 0;
      border-color: ${props => props.theme.lyon};
    }
  }
  button,
  input[type='submit'] {
    width: auto;
    background: white;
    color: black;
    border: 1px solid black;
    font-size: 2.4rem;
    font-weight: 400;
    font-family: 'roboto';
    padding: 0.5rem 2rem;
    margin-top: 6rem;
    text-align: center;
  }
  .last {
    margin-bottom: 0;
  }
  fieldset {
    border: 0;
    padding: 0;
    text-align: center;
    &[disabled] {
      opacity: 0.5;
    }
    /* animated stripe */
    &::before {
      margin-bottom: 2rem;
      /* margin-bottom: 6rem; */
      height: 1rem;
      content: '';
      display: block;
      background-image: linear-gradient(
        to right,
        #1c4386 0%,
        #f9ed43 50%,
        #1c4386 100%
      );
    }
    &[aria-busy='true']::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }
  .file {
    max-width: 40rem;
    margin: 0 auto 2rem auto;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover,
    &:active {
      background-color: ${props => props.theme.lemon};
    }
  }
  .hidden {
    width: 0;
    opacity: 0;
  }
`;

export default Form;
