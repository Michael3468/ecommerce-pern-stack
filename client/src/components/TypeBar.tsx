import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';

import { StoreContext } from '../index';

const TypeBar = observer(() => {
  const { deviceStore } = useContext(StoreContext);

  return (
    <ListGroup className="mt-3">
      {deviceStore.types.map((type) => (
        <ListGroup.Item
          key={type.id}
          style={{ cursor: 'pointer' }}
          active={type.id === deviceStore.selectedType.id}
          onClick={() => deviceStore.setSelectedType(type)}
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default TypeBar;
