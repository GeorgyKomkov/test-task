import { useSelector } from 'react-redux';
import { ListGroup } from 'react-bootstrap';

const ListItem = () => {
  const items = useSelector((state) => state.items.items);
  const list = items.map((item) => (
    <ListGroup.Item key={item.id} variant="success">{`Бренд - ${item.brand === null ? 'Неизвестный бренд' : item.brand}  Цена - ${item.price} Продукт - ${item.product} Индетификатор товара - ${item.id}` }</ListGroup.Item>
  ));

  return (
    <div>
      <h2 className="text-center mb-4">Список товаров</h2>
      {items.length > 0 ? (
        <div>
          <ListGroup as="ol" numbered>{list}</ListGroup>
        </div>
      ) : (
        <p>По указанным фильтрам товаров не найдено , попробуйте изменить фильтры.</p>
      )}
    </div>
  );
};

export default ListItem;
