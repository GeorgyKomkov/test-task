import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { addIProducts, addPrices, addBrands, setSeletedBrand, setSeletedPrice, setSeletedProduct, } from '../Slice/fieldsSlice';
import { useEffect } from 'react';
import { getFields, filterItems } from '../api/apiItems';
// import { addIds } from '../Slice/idsSlice';


const FilterComponent = () => {

    const dispatch = useDispatch();
    const {offset, limit, filters} = useSelector(state => state.parameters);
    const { products, prices, brands} =  useSelector(state => state.fields);


    useEffect(() => {
        const fetchData = async () => {
            // получаем данные для выпадающего списка и пр эл формы
            const fieldsProducts = await getFields('product', offset, limit);
            const fieldsPrices = await getFields('price', offset, limit);
            const fieldsBrands = await getFields('brand', offset, limit);
            const currentBrands = [...new Set(fieldsBrands)]
                .map(brand => brand === null ? 'Неизвестный бренд' : brand);

            dispatch(addIProducts(fieldsProducts));
            dispatch(addPrices(fieldsPrices));
            dispatch(addBrands(currentBrands));

        }
        fetchData()
    }, [dispatch, offset, limit]);


    useEffect(() => {

        const fetchData = async () => {
            if (Object.entries(filters).length === 0) { return }
            const data = await filterItems(filters);
            console.log(data);
        }
        fetchData()
    }, [dispatch, filters]);


    const options = (fields) => {
        return fields.map((field, i) => (
            <option key={i}>{field}</option>
        ))
    }

    const handleBrandChange = (event) => {
        if (event.target.value === 'Выбереите Бренд') {
            dispatch(setSeletedBrand(''));

        } else if (event.target.value === 'Неизвестный бренд') {
            dispatch(setSeletedBrand(null));
        } else {
            dispatch(setSeletedBrand(event.target.value));
        }

    };


    const handlePricehange = (event) => {
        if (event.target.value === 'Выберите Цену') {
            dispatch(setSeletedPrice(''));
        } else {
            dispatch(setSeletedPrice(event.target.value));
        }

    };
    const handleproductProduct = (event) => {
        if (event.target.value === 'Выберите Продукт') {
            dispatch(setSeletedProduct(''));
        }  else {
            dispatch(setSeletedProduct(event.target.value));
        }

    };


    return (
        <div>

            <Form.Select size="lg" onChange={handleBrandChange}>
                <option selected >Выбереите Бренд</option>
                {options(brands)}
            </Form.Select>
            <br />
            <Form.Select size="lg" onChange={handleproductProduct}>
                <option selected>Выберите Продукт</option>
                {options(products)}
            </Form.Select>
            <br />
            <Form.Select size="lg" onChange={handlePricehange}>
                <option selected>Выберите Цену</option>
                {options(prices)}
            </Form.Select>
        </div>
    );
}

export default FilterComponent;



