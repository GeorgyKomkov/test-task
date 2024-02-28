import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addIds } from '../Slice/idsSlice';
import { getIds, getItems } from '../api/apiItems';
import { incrementLimit, decrementLimit } from '../Slice/parametersSlice';
import { addItems, setLoadingFalse, setLoadingTrue } from '../Slice/itemsSlice';
import { ListGroup } from 'react-bootstrap';
import LoadingSpinner from './LodingSpiner';


const ListItemsComponent = () => {

    const dispatch = useDispatch();
    const { ids, filterIdsPrices, filterIdsBrands, filterIdsProducts } = useSelector(state => state.ids);
    const items = useSelector(state => state.items.items);
    const { offset, limit } = useSelector(state => state.parameters);
    const isLodingItems = useSelector(state => state.items.loading)

    useEffect(() => {
        const fetchData = async () => {
            const newIds = await getIds(offset, limit);
            dispatch(addIds(newIds));

        };
        fetchData();
    }, [dispatch, offset, limit]);


    useEffect(() => {
        const fetchData = async () => {
            dispatch(setLoadingTrue())
            const newItems = await getItems(ids);
            if (newItems.length > 0) {
                let currentItems = newItems.filter((item, index, array) =>
                    array.findIndex(o => o.id === item.id) === index
                );
                if (currentItems.length < 50 && ids.length >= 50) {
                    dispatch(incrementLimit(1));
                    return
                }
                if (currentItems.length > 50) {
                    dispatch(decrementLimit(1));
                    return
                }
                if (filterIdsPrices.length > 0) {
                    currentItems = currentItems.filter(item => filterIdsPrices.includes(item.id));
                    dispatch(addItems(currentItems));
                }
                if (filterIdsBrands.length > 0) {
                    currentItems = currentItems.filter(item => filterIdsBrands.includes(item.id));
                    dispatch(addItems(currentItems));
                }
                if (filterIdsProducts.length > 0) {
                    currentItems = currentItems.filter(item => filterIdsProducts.includes(item.id));
                    dispatch(addItems(currentItems));
                }
                else {
                    dispatch(addItems(currentItems));
                }
                dispatch(setLoadingFalse())
            }

        };
        fetchData();

    }, [dispatch, ids, filterIdsBrands, filterIdsPrices, filterIdsProducts]);

    const list = items.map((item) => (
        <ListGroup.Item key={item.id} variant="success">{`Бренд - ${item.brand === null ? 'Неизвестный бренд' : item.brand}  Цена - ${item.price} Продукт - ${item.product}`}</ListGroup.Item>
    ));




    return (
        <div >
            {isLodingItems ? <LoadingSpinner /> : 
            items.length > 0 ? 
            <div>
                <ListGroup as="ol" numbered>{list}</ListGroup> 
                </div>: 
                <p>По указанным фильтрам товаров не найдено , попробуйте изменить фильтры.</p>
        }

        </div>
    );
}

export default ListItemsComponent;
