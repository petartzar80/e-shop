import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Error from './ErrorMessage';
import PermissionsButton from './styles/PermissionsButton';
import Table from './styles/Table';

const possiblePermissions = [
  'ADMIN',
  'USER',
  'ITEMCREATE',
  'ITEMUPDATE',
  'ITEMDELETE',
  'PERMISSIONUPDATE',
];

const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      email
      name
      permissions
    }
  }
`;

const Permission = props => {
  const { data, loading, error } = useQuery(ALL_USERS_QUERY);
  return (
    <div>
      <Error error={error} />
      {data && (
        <div>
          <h2>Manage Permissions</h2>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                {possiblePermissions.map(permission => (
                  <th key={permission}>{permission}</th>
                ))}
                <th>▼</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map(user => (
                <UserComponent key={user.id} user={user} />
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

const UserComponent = props => {
  const user = props.user;
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      {possiblePermissions.map(permission => (
        <td key={permission}>
          <label htmlFor={`${user.id}-permission-${permission}`}>
            <input type="checkbox" />
          </label>
        </td>
      ))}
      <td>
        <PermissionsButton>Update</PermissionsButton>
      </td>
    </tr>
  );
};

export default Permission;
