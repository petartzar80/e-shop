import propTypes from 'prop-types';
import Link from 'next/link';

import DeleteItem from './DeleteItem';
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';

const Item = props => {
  const { item } = props;
  return (
    <ItemStyles>
      {item.image && <img src={item.image} alt={item.title} />}
      <Title>
        <Link
          href={{
            pathname: '/item',
            query: { id: item.id },
          }}
        >
          <a>{item.title}</a>
        </Link>
      </Title>
      <PriceTag>{formatMoney(item.price)}</PriceTag>
      <p>{item.description}</p>

      <div className="buttonList">
        <Link
          href={{
            pathname: 'update',
            query: { id: item.id },
          }}
        >
          <a className="edit">Edit</a>
        </Link>
        <button>Add To Cart</button>
        <DeleteItem id={item.id}>Delete</DeleteItem>
      </div>
    </ItemStyles>
  );
};

Item.propTypes = {
  item: propTypes.shape({
    id: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
    description: propTypes.string.isRequired,
    price: propTypes.number.isRequired,
  }),
};

export default Item;
