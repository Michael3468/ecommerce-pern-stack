import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';

import { Context } from '../index';

const TypeBar = observer(() => {
  const { deviceStore } = useContext(Context);

  return (
    <ListGroup className="mt-3">
      {deviceStore.types.map((type) => (
        <ListGroup.Item
          style={{ cursor: 'pointer' }}
          active={type.id === deviceStore.selectedType.id}
          onClick={() => deviceStore.setSelectedType(type)}
          key={type.id}
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default TypeBar;
