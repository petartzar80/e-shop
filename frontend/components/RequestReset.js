import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Form from './styles/Form';
import Error from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

const RequestReset = () => {
  const initValues = {
    email: '',
  };
  const [userInfo, setUserInfo] = useState(initValues);

  const saveUserInfo = e => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const [requestReset, { loading, error, called }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: {
        ...userInfo,
      },
    }
  );
  return (
    <Form
      // method post prevents password from accidentally
      // ending up in the url if sth breaks
      method="post"
      onSubmit={async e => {
        e.preventDefault();
        await requestReset();
        setUserInfo({ email: '' });
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Request Password Reset</h2>
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
        {!error && !loading && called && (
          <p>Success! Check your email for a reset link</p>
        )}
        <button type="submit">Submit</button>
      </fieldset>
    </Form>
  );
};

export default RequestReset;
