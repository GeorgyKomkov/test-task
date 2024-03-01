import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { addIProducts, addPrices, addBrands, setSeletedBrand, setSeletedPrice, setSeletedProduct,} from '../Slice/fieldsSlice';
import { getFields, filterItems } from '../api/apiItems';
import {
  addFilterIdsBrands, addFilterIdsPrices, addFilterIdsProducts,
  clearFilterIdsBrands, clearFilterIdsProducts, clearFilterIdsPrices,
} from '../Slice/idsSlice';

const FilterComponent = () => {
  const dispatch = useDispatch();
  const { offset, limit, filters, filterStatus,} = useSelector((state) => state.parameters);
  const { products, prices, brands } = useSelector((state) => state.fields);
  const { selectedBrand, selectedPrice, selectedProduct,} = useSelector((state) => state.fields.selectedFileds);
  const isLodingItems = useSelector((state) => state.items.loading);

  useEffect(() => {
    const fetchData = async () => {
      const fieldsProducts = await getFields('product', offset, limit);
      const fieldsPrices = await getFields('price', offset, limit);
      const fieldsBrands = await getFields('brand', offset, limit);
      const currentBrands = [...new Set(fieldsBrands)]
        .map((brand) => (brand === null ? 'Неизвестный бренд' : brand));

      const currentFieldsPrices = new Set(fieldsPrices.sort((a, b) => a - b));

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

  const options = (fields) => fields.map((field, i) => (
    <option className="text-truncate" key={i}>{field}</option>
  ));




  const handleBrandChange = (event) => {
    if (event.target.value === 'Выбрать все') {
      dispatch(setSeletedBrand(''));
    } else if (event.target.value === 'Неизвестный бренд') {
      dispatch(setSeletedBrand(null));
    } else {
      dispatch(setSeletedBrand(event.target.value));
    }
  };

  const handlePriceChange = (event) => {
    if (event.target.value === 'Выбрать все') {
      dispatch(setSeletedPrice(''));
    } else {
      dispatch(setSeletedPrice(+event.target.value));
    }
  };
  const handleProductChange = (event) => {
    if (event.target.value === 'Выбрать все') {
      dispatch(setSeletedProduct(''));
    } else {
      dispatch(setSeletedProduct(event.target.value));
    }
  };

  return (
    <div>
      <h4 className="text-center">Фильтр</h4>
      <Form.Group>
        <Form.Label className="form-label fw-bold text-truncate" >Выберите Бренд</Form.Label>
        <Form.Select className='text-truncate' size="lg" onChange={handleBrandChange} disabled={isLodingItems} value={selectedBrand}>
          {options(brands)}
        </Form.Select>

        <Form.Label className="form-label fw-bold text-truncate">Выберите Продукт</Form.Label>
        <Form.Select className='text-truncate' size="lg" onChange={handleProductChange} disabled={isLodingItems} value={selectedProduct}>
          {options(products)}
        </Form.Select>

        <Form.Label className="form-label fw-bold text-truncate">Выберите Цену</Form.Label>
        <Form.Select className='text-truncate' size="lg" onChange={handlePriceChange} disabled={isLodingItems} value={selectedPrice}>
          {options(prices)}
        </Form.Select>
      </Form.Group>
    </div>
  );
}

export default FilterComponent;
