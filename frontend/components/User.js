import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import propTypes from 'prop-types';

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      permissions
    }
  }
`;

const User = props => {
  const payload = useQuery(CURRENT_USER_QUERY);
  return <React.Fragment>{props.children(payload)}</React.Fragment>;
};

User.propTypes = {
  children: propTypes.func.isRequired,
};

export default User;
export { CURRENT_USER_QUERY };
