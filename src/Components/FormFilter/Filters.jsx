import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setSeletedBrand, setSeletedPrice, setSeletedProduct } from '../../Slice/fieldsSlice';

const Filters = () => {
  const dispatch = useDispatch();
  const { products, prices, brands } = useSelector((state) => state.fields);
  const {
    selectedBrand, selectedPrice, selectedProduct,
  } = useSelector((state) => state.fields.selectedFileds);
  const isLodingItems = useSelector((state) => state.items.loading);

  const options = (fields) => fields.map((field) => (

    <option className="text-truncate" key={`${field}`}>{field}</option>
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
    <>
      <Form.Label className="form-label fw-bold text-truncate">Выберите Бренд</Form.Label>
      <Form.Select className="text-truncate" size="lg" onChange={handleBrandChange} disabled={isLodingItems} value={selectedBrand}>
        {options(brands)}
      </Form.Select>

      <Form.Label className="form-label fw-bold text-truncate">Выберите Продукт</Form.Label>
      <Form.Select className="text-truncate" size="lg" onChange={handleProductChange} disabled={isLodingItems} value={selectedProduct}>
        {options(products)}
      </Form.Select>

      <Form.Label className="form-label fw-bold text-truncate">Выберите Цену</Form.Label>
      <Form.Select className="text-truncate" size="lg" onChange={handlePriceChange} disabled={isLodingItems} value={selectedPrice}>
        {options(prices)}
      </Form.Select>
    </>
  );
};

export default Filters;
