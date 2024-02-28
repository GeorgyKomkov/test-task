import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { addIProducts, addPrices, addBrands, setSeletedBrand, setSeletedPrice, setSeletedProduct, } from '../Slice/fieldsSlice';
import { useEffect } from 'react';
import { getFields, filterItems } from '../api/apiItems';
import { addFilterIdsBrands, addFilterIdsPrices, addFilterIdsProducts, clearFilterIdsBrands, clearFilterIdsProducts, clearFilterIdsPrices } from '../Slice/idsSlice';


const FilterComponent = () => {

    const dispatch = useDispatch();
    const {offset, limit, filters, filterStatus} = useSelector(state => state.parameters);
    const { products, prices, brands} =  useSelector(state => state.fields);
    const {selectedBrand, selectedPrice, selectedProduct } = useSelector(state => state.fields)
    const isLodingItems = useSelector(state => state.items.loading); 

    useEffect(() => {
        const fetchData = async () => {
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
            if (filterStatus === 'no filter' ) { 
                if (!selectedBrand) { dispatch(clearFilterIdsBrands())}
                if (!selectedPrice) {dispatch(clearFilterIdsPrices())}
                if (!selectedProduct) {dispatch(clearFilterIdsProducts())}
                return 
            }

            if (filterStatus === 'brand' ) {
                const brandIds = await filterItems(filters);
                dispatch(addFilterIdsBrands(brandIds));
            }
            if (filterStatus === 'price'  ) {
                const priceIds = await filterItems(filters);
                dispatch(addFilterIdsPrices(priceIds));
            }
            if (filterStatus === 'product' ) {
                const productsIds = await filterItems(filters);
                dispatch(addFilterIdsProducts(productsIds));
            }
        }
        fetchData()
    }, [dispatch, filters, filterStatus, selectedProduct, selectedPrice, selectedBrand]);


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
            dispatch(setSeletedPrice(+event.target.value));
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
            <h4 className="text-center">Фильтр</h4>
            <label className="form-label fw-bold">Выберите Бренд</label>
            <Form.Select size="lg" onChange={handleBrandChange}  disabled={isLodingItems}>
                <option>Выбереите Бренд</option>
                {options(brands)}
            </Form.Select>
            
            <label className="form-label fw-bold">Выберите Продукт</label>
            <Form.Select size="lg" onChange={handleproductProduct} disabled={isLodingItems}>
                <option>Выберите Продукт</option>
                {options(products)}
            </Form.Select>
           
            <label className="form-label fw-bold">Выберите Цену</label>
            <Form.Select size="lg" onChange={handlePricehange} disabled={isLodingItems}>
                <option>Выберите Цену</option>
                {options(prices)}
            </Form.Select>
        </div>
    );
}

export default FilterComponent;



