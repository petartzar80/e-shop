import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Router from 'next/router';

import Form from './styles/Form';
import Error from './ErrorMessage';
import { cloudinary } from '../cloudinary';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

const CreateItem = () => {
  const initValues = {
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0,
  };

  const [createItem, { loading, error }] = useMutation(CREATE_ITEM_MUTATION);
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

  const uploadFile = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'e-shop');

    const res = await fetch(cloudinary, {
      method: 'POST',
      body: data,
    });
    const file = await res.json();

    setStateValues(values => ({
      ...values,
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    }));
  };

  return (
    <Form
      onSubmit={async e => {
        // stop the form from submitting
        e.preventDefault();
        // call the mutation
        const res = await createItem({
          variables: { ...stateValues },
        });
        // change them to the single item page
        Router.push({
          pathname: '/item',
          query: { id: res.data.createItem.id },
        });
      }}
    >
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="file" className="file">
          <span>Click here to upload an image.</span>
          <input
            type="file"
            id="file"
            name="file"
            className="hidden"
            placeholder="Upload an image"
            required
            onChange={e => uploadFile(e)}
          />
        </label>
        {stateValues.image && (
          <img width="200" src={stateValues.image} alt="Upload Preview" />
        )}
        <label htmlFor="title">
          Title
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            required
            value={stateValues.title}
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
            value={stateValues.price === 0 ? '' : stateValues.price}
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
            value={stateValues.description}
            onChange={e => handleChange(e)}
          />
        </label>
        <button type="submit">Submit</button>
      </fieldset>
    </Form>
  );
};

export default CreateItem;
export { CREATE_ITEM_MUTATION };
