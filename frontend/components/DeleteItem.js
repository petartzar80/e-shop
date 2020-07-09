import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { ALL_ITEMS_QUERY } from './Items';

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

const update = (cache, payload) => {
  // manually update the cache on the client so it matches the server
  // 1. read the cache for the items
  const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
  // 2. Filter the deleted item out of the page
  const filteredItems = data.items.filter(
    item => item.id !== payload.data.deleteItem.id
  );
  // 3. Put the items back
  cache.writeQuery({ query: ALL_ITEMS_QUERY, data: { items: filteredItems } });
};

const DeleteItem = props => {
  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION, {
    variables: { id: props.id },
    update,
  });

  return (
    <button
      onClick={() => {
        if (confirm('Are you sure you want to delete this?')) {
          deleteItem();
        }
      }}
    >
      {props.children}
    </button>
  );
};

export default DeleteItem;
