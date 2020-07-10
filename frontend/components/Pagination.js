import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Head from 'next/head';
import Link from 'next/link';

import PaginationStyles from './styles/PaginationStyles';
import { perPage } from '../config';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = props => {
  const { data, loading, error } = useQuery(PAGINATION_QUERY);

  let count;

  if (data) {
    count = data.itemsConnection.aggregate.count;
  }

  const pages = Math.ceil(count / perPage);
  const page = props.page;

  return (
    <>
      {error && <Error error={error} />}
      {loading && <p>Loading Pagination...</p>}
      {!loading && (
        <PaginationStyles data-test="pagination">
          <Head>
            <title>
              Transistore - Page {page} of {pages}
            </title>
          </Head>
          <Link
            href={{
              pathname: 'items',
              query: { page: page - 1 },
            }}
          >
            <a className="prev" aria-disabled={page <= 1}>
              &lt;
            </a>
          </Link>
          <p className="pages">
            Page {page} of <span className="totalPages">{pages}</span>
          </p>
          <div className="gap"></div>
          <p className="items">{count} Items Total</p>
          <Link
            href={{
              pathname: 'items',
              query: { page: page + 1 },
            }}
          >
            <a className="next" aria-disabled={page >= pages}>
              &gt;
            </a>
          </Link>
        </PaginationStyles>
      )}
    </>
  );
};

export default Pagination;
export { PAGINATION_QUERY };
