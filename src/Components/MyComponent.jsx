import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addIds } from '../Slice/idsSlice';
import { getIds, getItems } from '../api/apiItems';
import { incrementLimit, decrementLimit } from '../Slice/parametersSlice';
import { addItems, setLoadingFalse, setLoadingTrue } from '../Slice/itemsSlice';
import PaginationComponent from './PaginationComponent';
import { ListGroup } from 'react-bootstrap';
import LoadingSpinner from './LodingSpiner';
import FilterComponent from './FilterComponent';

function MyComponent() {

    const dispatch = useDispatch();
    const ids = useSelector(state => state.ids.ids);
    const filterIds = useSelector(state => state.ids.filterIds);
    const items = useSelector(state => state.items.items);
    const {offset, limit} = useSelector(state => state.parameters);
    const isLodingItems = useSelector(state => state.items.loading)

    useEffect(() => {
        const fetchData = async () => {
            const newIds = await getIds(offset, limit);
            dispatch(addIds(newIds));

        };
        fetchData();
    }, [dispatch, offset, filterIds, limit]);


    useEffect(() => {
        const fetchData = async () => {
            dispatch(setLoadingTrue())
            const newItems = await getItems(ids);
            if (newItems.length > 0) {
                const currentItems = newItems.filter((item, index, array) =>
                    array.findIndex(o => o.id === item.id) === index
                );
               if (currentItems.length < 50 ) {
                dispatch(incrementLimit(1));
                return
               }
               if (currentItems.length > 50) {
                alert('вот тут смотри ids');
                dispatch(decrementLimit(1));
                return
               }
                dispatch(addItems(currentItems));
                dispatch(setLoadingFalse())
            }

        };
        fetchData();

    }, [dispatch, ids]);

    const list = items.map((item) => (
        <ListGroup.Item key={item.id} variant="success">{`Бренд - ${item.brand === null ? 'Неизвестный бренд' : item.brand}  Цена - ${item.price} Продукт - ${item.product}`}</ListGroup.Item>
    ));


    return (
        <div>
            <FilterComponent />
            <PaginationComponent />
            {isLodingItems ? <LoadingSpinner /> : <ListGroup as="ol" numbered >{list}</ListGroup>}

        </div>
    );
}

export default MyComponent;
