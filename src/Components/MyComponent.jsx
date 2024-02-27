import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addIds } from '../Slice/idsSlice'; // Путь к вашему экшену addIds
import { getIds, getItems } from '../api/get'; // Путь к вашей функции getIds
import { addItems, toggleLoading } from '../Slice/itemsSlice';
import PaginationComponent from './PaginationComponent';
import { ListGroup } from 'react-bootstrap';
import FilterComponent from './FilterComponent';

function MyComponent() {

    const dispatch = useDispatch();
    const ids = useSelector(state => state.ids.ids)
    const items = useSelector(state => state.items.items)
    const offset = useSelector(state => state.parameters.offset);
    const isLodingItems = useSelector(state => state.items.loading)

    useEffect(() => {
        const fetchData = async () => {
            const newIds = await getIds(offset);
            dispatch(addIds(newIds));
        };
        fetchData();
    }, [dispatch, offset]);


    useEffect(() => {
        const fetchData = async () => {
           
            const newItems = await getItems(ids);
            dispatch(toggleLoading())
            if (newItems.length > 0) {
                const currentItems = newItems.filter((item, index, array) =>
                    array.findIndex(o => o.id === item.id) === index
                );
                dispatch(addItems(currentItems));
                dispatch(toggleLoading())
            }
        };
        fetchData();

    }, [dispatch, ids]);

    const list = items.map((item) => (
        <ListGroup.Item key={item.id} variant="success">{`Бренд - ${item.brand === null ? 'Не известен' : item.brand}  Цена - ${item.price} Продукт - ${item.product}`}</ListGroup.Item>
    ));


    return (
        <div>
            <FilterComponent />
            <PaginationComponent />
 { 
isLodingItems ? 'Loding' : <ListGroup as="ol" numbered >{list}</ListGroup>
       
  }
            
        </div>
    );
}

export default MyComponent;
