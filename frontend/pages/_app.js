import Page from '../components/Page';
import { ApolloProvider } from '@apollo/react-hooks';

import withData from '../lib/withData';

const App = ({ Component, pageProps, apollo }) => {
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps}></Component>
      </Page>
    </ApolloProvider>
  );
};

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  // crawl every page for queries and mutations
  // all them have to be fired off and resolved
  // before rendering out the page
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  // this exposes the query to the user
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(App);
