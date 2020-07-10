import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Head from 'next/head';

import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import SingleItemStyles from './styles/SingleItemStyles';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      largeImage
      price
    }
  }
`;

const SingleItem = props => {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id: props.id },
  });

  let item;

  if (data) {
    item = data.item;
  }

  return (
    <>
      {error && <Error error={error} />}
      {loading && <p>Loading Single Item...</p>}
      {!loading && !item && <p>No Item Found for {props.id}</p>}

      {!loading && item && (
        <SingleItemStyles>
          <Head>
            <title>Transistore | {item.title}</title>
          </Head>
          <img src={item.largeImage} alt={item.title} />
          <div className="details">
            <p className="title">{item.title}</p>
            <p className="description">{item.description}</p>
            <p className="long-description">
              Aenean non nisi congue, pretium dui in, efficitur just. Nulla
              aliquet velit ligula, in fermentum est ultrices a. Fusce nulla
              augue, laoreet id rhoncus non, sodales imperdiet mauris. Proin id
              hendrerit nibh, id fermentum magna. Nunc rutrum, nisi sed
              convallis tincidunt, lacus sem convallis enim, a eleifend metus
              justo nec sapien.
            </p>
            <p>{formatMoney(item.price)}</p>
          </div>
        </SingleItemStyles>
      )}
    </>
  );
};

export default SingleItem;
export { SINGLE_ITEM_QUERY };
