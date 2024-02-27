import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { addIProducts, addPrices, addBrands } from '../Slice/fieldsSlice'
import { useEffect, useState } from 'react';
import { getFields, filterItems } from '../api/get';
import { addIds } from '../Slice/idsSlice';


const FilterComponent = () => {
    const [activeBrand, setactiveBrand] = useState('');
    const dispatch = useDispatch();
    const fields = useSelector(state => state.fields);
    const { products, prices, brands } = fields;

    useEffect(()=>{
        const fetchData = async () => {
    
        }
        fetchData()
    },[])

    useEffect(() => {
        const fetchData = async () => {
            const fieldsProducts = await getFields('product')
            const fieldsPrices = await getFields('price')
            const fieldsBrands = await getFields('brand')
            const currentBrands = [...new Set(fieldsBrands)]
                .map(brand => brand === null ? 'Неизвестный' : brand)

            dispatch(addIProducts(fieldsProducts));
            dispatch(addPrices(fieldsPrices));
            dispatch(addBrands(currentBrands));

        }
        fetchData()
    }, [dispatch]);


    useEffect(() => {
     
       const fetchData = async () => {
       const filterIds = await filterItems({'brand' : activeBrand})
       dispatch(addIds(filterIds))
    }
    fetchData()
    }, [activeBrand, dispatch]);


    const options = (fields) => {
        return fields.map((field, i) => (
            <option key={i}>{field}</option>
        ))
    }

    const handleBrandChange = (event) => {
        if (event.target.value === 'Неизвестный') {
            setactiveBrand(null);
        }else {
            setactiveBrand(event.target.value);
        }
      
    };

    return (
        <div>
            <Form.Select size="lg"  onChange={handleBrandChange}>
                <option selected >Выбереите Бренд</option>
                {options(brands)}
            </Form.Select>
            <br />
            <Form.Select size="lg">
                <option selected>Выберите Продукт</option>
                {options(products)}
            </Form.Select>
            <br />
            <Form.Select size="lg">
                <option selected>Выберите Цену</option>
                {options(prices)}
            </Form.Select>
        </div>
    );
}

export default FilterComponent