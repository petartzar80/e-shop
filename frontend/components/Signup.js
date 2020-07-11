import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Form from './styles/Form';
import Error from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

const Signup = () => {
  const initValues = {
    name: '',
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

  const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: {
      ...userInfo,
    },
  });
  return (
    <Form
      // method post prevents password from accidentally
      // ending up in the url if sth breaks
      method="post"
      onSubmit={async e => {
        e.preventDefault();
        await signup();
        // clear out the user info
        setUserInfo({ name: '', email: '', password: '' });
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Sign Up for An Account</h2>
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
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            placeholder="name"
            value={userInfo.name}
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

        <button type="submit">Sign Up!</button>
      </fieldset>
    </Form>
  );
};

export default Signup;
