import { useQuery } from '@apollo/react-hooks';
import { useState } from 'react';
import gql from 'graphql-tag';
import propTypes from 'prop-types';

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
                <UserPermissions key={user.id} user={user} />
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

const UserPermissions = props => {
  const user = props.user;
  const initValue = {
    permissions: props.user.permissions,
  };
  const [userInfo, setUserInfo] = useState(initValue);
  const handlePermissionChange = e => {
    const checkbox = e.target;
    // take a copy of the updated permissions
    let updatedPermissions = [...userInfo.permissions];
    // figure out if we should add or remove this permission
    if (checkbox.checked) {
      // add it in
      updatedPermissions.push(checkbox.value);
    } else {
      updatedPermissions = updatedPermissions.filter(
        permission => permission !== checkbox.value
      );
    }
    setUserInfo({
      permissions: updatedPermissions,
    });
  };
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      {possiblePermissions.map(permission => (
        <td key={permission}>
          <label htmlFor={`${user.id}-permission-${permission}`}>
            <input
              type="checkbox"
              checked={userInfo.permissions.includes(permission)}
              value={permission}
              onChange={e => handlePermissionChange(e)}
            />
          </label>
        </td>
      ))}
      <td>
        <PermissionsButton>Update</PermissionsButton>
      </td>
    </tr>
  );
};

UserPermissions.propTypes = {
  user: propTypes.shape({
    name: propTypes.string,
    id: propTypes.string,
    email: propTypes.string,
    permissions: propTypes.array,
  }).isRequired,
};

export default Permission;
