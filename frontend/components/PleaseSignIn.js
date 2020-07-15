import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';

import { CURRENT_USER_QUERY } from './User';
import Signin from './Signin';

const Warning = styled.p`
  text-align: center;
  font-size: 2rem;
`;

const PleaseSignIn = props => {
  const { data, loading } = useQuery(CURRENT_USER_QUERY);
  if (loading) return <p>Loading Please Sign In...</p>;
  if (!loading && !data.me) {
    return (
      <div>
        <Warning>Please, sign in before continuing.</Warning>
        <Signin />
      </div>
    );
  }

  return props.children;
};

export default PleaseSignIn;
