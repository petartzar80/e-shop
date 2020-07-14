import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import propTypes from 'prop-types';

import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      name
    }
  }
`;

const Reset = props => {
  const initValues = {
    password: '',
    confirmPassword: '',
  };
  const [userInfo, setUserInfo] = useState(initValues);

  const saveUserInfo = e => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const [resetPassword, { loading, error, called }] = useMutation(
    RESET_MUTATION,
    {
      variables: {
        resetToken: props.resetToken,
        password: userInfo.password,
        confirmPassword: userInfo.confirmPassword,
      },
      refetchQueries: [
        {
          query: CURRENT_USER_QUERY,
        },
      ],
    }
  );
  return (
    <Form
      method="post"
      onSubmit={async e => {
        e.preventDefault();
        await resetPassword();
        setUserInfo({ password: '', confirmPassword: '' });
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Reset Your Password</h2>
        <Error error={error} />
        {!error && !loading && called && (
          <p>Success! Your password was changed.</p>
        )}
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
        <label htmlFor="confirmPassword">
          Confirm Your Password
          <input
            type="password"
            name="confirmPassword"
            placeholder="confirm password"
            value={userInfo.confirmPassword}
            onChange={e => saveUserInfo(e)}
          />
        </label>

        <button type="submit">Reset Password</button>
      </fieldset>
    </Form>
  );
};

Reset.propTypes = {
  resetToken: propTypes.string.isRequired,
};

export default Reset;
