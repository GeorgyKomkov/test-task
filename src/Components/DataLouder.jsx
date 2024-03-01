import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addIds } from '../Slice/idsSlice';
import { getIds, getItems } from '../api/apiItems';
import { incrementLimit, decrementLimit } from '../Slice/parametersSlice';
import { addItems, setLoadingFalse, setLoadingTrue } from '../Slice/itemsSlice';

const DataLouder = () => {
  const dispatch = useDispatch();
  const {
    ids, filterIdsPrices, filterIdsBrands, filterIdsProducts,
  } = useSelector((state) => state.ids);
  const { offset, limit } = useSelector((state) => state.parameters);

  useEffect(() => {
    const fetchData = async () => {
      const newIds = await getIds(offset, limit);
      dispatch(addIds(newIds));
    };
    fetchData();
  }, [dispatch, offset, limit]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoadingTrue());
      const newItems = await getItems(ids);
      if (newItems.length > 0) {
        let currentItems = newItems
          .filter((item, index, array) => array.findIndex((o) => o.id === item.id) === index);
        if (currentItems.length < 50 && ids.length >= 50) {
          dispatch(incrementLimit(1));
          return;
        }
        if (currentItems.length > 50) {
          dispatch(decrementLimit(1));
          return;
        }
        if (filterIdsPrices.length > 0) {
          currentItems = currentItems.filter((item) => filterIdsPrices.includes(item.id));
        }
        if (filterIdsBrands.length > 0) {
          currentItems = currentItems.filter((item) => filterIdsBrands.includes(item.id));
        }
        if (filterIdsProducts.length > 0) {
          currentItems = currentItems.filter((item) => filterIdsProducts.includes(item.id));
        }
        dispatch(addItems(currentItems));
        dispatch(setLoadingFalse());
      }
    };
    fetchData();
  }, [dispatch, ids, filterIdsBrands, filterIdsPrices, filterIdsProducts]);

  return;
};

export default DataLouder;