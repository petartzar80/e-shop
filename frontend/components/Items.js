import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styled from 'styled-components';

import Item from './Item';

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

const Items = () => {
  const { data, error, loading } = useQuery(ALL_ITEMS_QUERY);
  if (loading) return <p>Loading Items...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log('data: ', data);

  return (
    <Center>
      <p>Control I'm here</p>
      <ItemsList>
        {data.items.map(item => (
          <Item item={item} key={item.id} />
        ))}
      </ItemsList>
    </Center>
  );
};

export default Items;
export { ALL_ITEMS_QUERY };
