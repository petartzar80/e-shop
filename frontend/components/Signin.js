import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

const Signin = () => {
  const initValues = {
    password: '',
    email: '',
  };
  const [userInfo, setUserInfo] = useState(initValues);

  const saveUserInfo = e => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const [signin, { loading, error }] = useMutation(SIGNIN_MUTATION, {
    variables: {
      ...userInfo,
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <Form
      // method post prevents password from accidentally
      // ending up in the url if sth breaks
      method="post"
      onSubmit={async e => {
        e.preventDefault();
        await signin();
        setUserInfo({ email: '', password: '' });
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Sign Into Your Account</h2>
        <Error error={error} />
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="email"
            value={userInfo.email}
            onChange={e => saveUserInfo(e)}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="password"
            value={userInfo.password}
            onChange={e => saveUserInfo(e)}
          />
        </label>

        <button type="submit">Sign In!</button>
      </fieldset>
    </Form>
  );
};

export default Signin;
