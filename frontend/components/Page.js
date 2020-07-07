import Header from './Header';
import Meta from './Meta';

const Page = props => {
  return (
    <div>
      <Meta />
      <Header />
      <p>Page component</p>
      {props.children}
    </div>
  );
};

export default Page;
