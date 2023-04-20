import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Pagination } from 'react-bootstrap';

import { StoreContext } from '../index';

const Pages = observer(() => {
  const { deviceStore } = useContext(StoreContext);
  const pagesCount = Math.ceil(deviceStore.totalCount / deviceStore.limit);
  const pages = [];

  for (let i = 0; i < pagesCount; i += 1) {
    pages.push(i + 1);
  }

  return (
    <Pagination className="mt-5">
      {pages.map((page) => (
        <Pagination.Item
          key={page}
          active={deviceStore.page === page}
          onClick={() => deviceStore.setPage(page)}
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
});

export default Pages;
