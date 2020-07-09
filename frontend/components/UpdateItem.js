import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`;

const UpdateItem = props => {
  const initValues = {};

  const [updateItem, { loading, error }] = useMutation(UPDATE_ITEM_MUTATION);
  const { data, loading: loadingQ } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id: props.id },
  });

  const [stateValues, setStateValues] = useState(initValues);

  const handleChange = e => {
    const { name, type, value } = e.target;
    // if NaN when deleting price, parse "0"
    const val = type === 'number' ? parseFloat(value || '0') : value;
    setStateValues(values => ({
      ...values,
      [name]: val,
    }));
  };

  const handleUpdate = async (e, updateItem) => {
    e.preventDefault();

    const res = await updateItem({
      variables: {
        id: props.id,
        ...stateValues,
      },
    });
  };

  return (
    <>
      {loadingQ && <p>Loading Item for update</p>}
      {!loadingQ && !data.item && <p>No item found for ID: ${props.id}</p>}
      {!loadingQ && data.item && (
        <Form onSubmit={e => handleUpdate(e, updateItem)}>
          <Error error={error} />
          <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor="title">
              Title
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                required
                defaultValue={data.item.title}
                onChange={e => handleChange(e)}
              />
            </label>

            <label htmlFor="price">
              Price
              <input
                type="number"
                id="price"
                name="price"
                placeholder="Price"
                required
                defaultValue={data.item.price}
                // value={stateValues.price === 0 ? "" : stateValues.price}
                onChange={e => handleChange(e)}
              />
            </label>

            <label htmlFor="description">
              Description
              <input
                type="text"
                id="description"
                name="description"
                placeholder="Enter A Description"
                required
                defaultValue={data.item.description}
                onChange={e => handleChange(e)}
              />
            </label>
            <button type="submit">Sav{loading ? 'ing' : 'e'} Changes</button>
          </fieldset>
        </Form>
      )}
    </>
  );
};

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
