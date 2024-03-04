import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  addIProducts, addPrices, addBrands, setSeletedBrand, setSeletedPrice, setSeletedProduct,
} from '../../Slice/fieldsSlice';
import { getFields, filterItems } from '../../api/apiItems';
import {
  addFilterIdsBrands, addFilterIdsPrices, addFilterIdsProducts,
  clearFilterIdsBrands, clearFilterIdsProducts, clearFilterIdsPrices,
} from '../../Slice/idsSlice';
import Filters from './Filters';

const FormFilterComponent = () => {
  const dispatch = useDispatch();
  const {
    offset, limit, filters, filterStatus,
  } = useSelector((state) => state.parameters);
  const {
    selectedBrand, selectedPrice, selectedProduct,
  } = useSelector((state) => state.fields.selectedFileds);

  useEffect(() => {
    const fetchData = async () => {
      const fieldsProducts = await getFields('product', offset, limit);
      const fieldsPrices = await getFields('price', offset, limit);
      const fieldsBrands = await getFields('brand', offset, limit);
      const currentBrands = [...new Set(fieldsBrands)]
        .map((brand) => (brand === null ? 'Неизвестный бренд' : brand));

      const currentFieldsPrices = [...new Set(fieldsPrices.sort((a, b) => a - b))];

      dispatch(addIProducts(fieldsProducts));
      dispatch(addPrices(currentFieldsPrices));
      dispatch(addBrands(currentBrands));
    };
    fetchData();
  }, [dispatch, offset, limit]);

  useEffect(() => {
    dispatch(setSeletedBrand(''));
    dispatch(setSeletedPrice(''));
    dispatch(setSeletedProduct(''));
  }, [dispatch, offset]);

  useEffect(() => {
    const fetchData = async () => {
      if (filterStatus === 'no filter') {
        if (!selectedBrand) { dispatch(clearFilterIdsBrands()); }
        if (!selectedPrice) { dispatch(clearFilterIdsPrices()); }
        if (!selectedProduct) { dispatch(clearFilterIdsProducts()); }
        return;
      }

      if (filterStatus === 'brand') {
        const brandIds = await filterItems(filters);
        dispatch(addFilterIdsBrands(brandIds));
      }
      if (filterStatus === 'price') {
        const priceIds = await filterItems(filters);
        dispatch(addFilterIdsPrices(priceIds));
      }
      if (filterStatus === 'product') {
        const productsIds = await filterItems(filters);
        dispatch(addFilterIdsProducts(productsIds));
      }
    };
    fetchData();
  }, [dispatch, filters, filterStatus, selectedProduct, selectedPrice, selectedBrand]);

  return (
    <div>
      <h4 className="text-center">Фильтр</h4>
      <Form.Group>
        <Filters />
      </Form.Group>
    </div>
  );
};

export default FormFilterComponent;
