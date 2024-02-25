import { useEffect, useState } from 'react';
import { getIds, getItems, getFields, filterItems } from "../api/get";


const MyComponent = () => {

  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [brandValues, setBrandValues] = useState([]);
  const [productValues, setProductValues] = useState([]);
  const [priceValues, setPriceValues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const ids = await getIds(offset);
      if (ids.length === 0) {
        setHasMore(false);
        return;
      }
      const fetchedItems = await getItems(ids);
      // Удаление дубликатов объектов по полю 'id'
      const uniqueItems = [...new Set(fetchedItems.map(item => item.id))]
        .map(id => fetchedItems.find(item => item.id === id));
      setItems(uniqueItems);
//---------------------------------------------------------------
       const products = await getFields("product");  // тут получаем массив элеметов по передаму праметру
       const prices = await getFields("price"); 
       const brands = await getFields("brand");
       const filteredItems = {}
  //  const fiterId = await filterItems({"product" : products.result[0], "price": price.result[0],  'brand' : brand.result[0]} );
   // тут я делаю логику что если у нас получет массив по продуктам(или другим элементам), то добовляем  ключ с значением в данном случаем первым в объект 
        if (products) {filteredItems["product"] = products.result[0]}
        if (prices) {filteredItems["prices"] = prices.result[0]}
        if (brands) {brands["product"] = brands.result[0]}
      
        const fiterIds = await filterItems(filteredItems);
        console.log(fiterIds)
   

//------------------------------------------------------------------
 
    };

    fetchData();
  }, [offset]);

  const list = items.map((item) => (
    <li key={item.id}>{`Бренд - ${item.brand} Price - ${item.price} Product - ${item.product}`}</li>
  ));

  const clickNext = () => setOffset(prev =>  prev + 50);
  const clickPrev = () => setOffset(prev => prev - 50);
  

  return (
    <div>
         <div>
        <h2>Фильтр</h2>
    

        <select value={'Product'} >
          <option value="">Выберите товар</option>
          {productValues.map((value, index) => (
            <option key={index} value={value}>{value}</option>
          ))}
        </select>

  

      </div>
        <button onClick={clickPrev} disabled={offset === 0}>{'назад'}</button>
        <button onClick={clickNext} disabled={!hasMore}>{'вперед'}</button>
      <ol>{list}</ol>
    </div>
  );
};

export default MyComponent;


// import React, { useEffect, useState } from 'react';
// import { getIds, getItems, getFieldValues, filterItems } from "../api/get";

// const MyComponent = () => {
//   const [items, setItems] = useState([]);
//   const [offset, setOffset] = useState(0);
//   const [hasMore, setHasMore] = useState(true);
//   const [brandValues, setBrandValues] = useState([]);
//   const [productValues, setProductValues] = useState([]);
//   const [priceValues, setPriceValues] = useState([]);
//   const [selectedBrand, setSelectedBrand] = useState("");
//   const [selectedProduct, setSelectedProduct] = useState("");
//   const [selectedPrice, setSelectedPrice] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       const ids = await getIds(offset);
//       if (ids.length === 0) {
//         setHasMore(false);
//         return;
//       }
//       const fetchedItems = await getItems(ids);
//       const uniqueItems = [...new Set(fetchedItems.map(item => item.id))]
//         .map(id => fetchedItems.find(item => item.id === id));
//       setItems(uniqueItems);

//       const brandValues = await getFieldValues("brand");
//       const productValues = await getFieldValues("product");
//       const priceValues = await getFieldValues("price");
//       setBrandValues(brandValues);
//       setProductValues(productValues);
//       setPriceValues(priceValues);
//     };

//     fetchData();
//   }, [offset]);

//   const handleFilter = async () => {
//     let filters = {};
//     if (selectedBrand !== "") {
//       filters["brand"] = selectedBrand;
//     }
//     if (selectedProduct !== "") {
//       filters["product"] = selectedProduct;
//     }
//     if (selectedPrice !== "") {
//       filters["price"] = parseFloat(selectedPrice);
//     }
//     const filteredItems = await filterItems(filters);
//     setItems(filteredItems);
//   };

//   const list = items.map((item) => (
//     <li key={item.id}>{`Название: ${item.product}, Цена: ${item.price}, Бренд: ${item.brand}`}</li>
//   ));

//   const clickNext = () => setOffset(prev => prev + 50);
//   const clickPrev = () => setOffset(prev => prev - 50);

//   return (
    // <div>
      //    <div>
      //   <h2>Фильтр</h2>
      //   <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
      //     <option value="">Выберите бренд</option>
      //     {brandValues.map((value, index) => (
      //       <option key={index} value={value}>{value}</option>
      //     ))}
      //   </select>

      //   <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
      //     <option value="">Выберите товар</option>
      //     {productValues.map((value, index) => (
      //       <option key={index} value={value}>{value}</option>
      //     ))}
      //   </select>

      //   <select value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)}>
      //     <option value="">Выберите цену</option>
      //     {priceValues.map((value, index) => (
      //       <option key={index} value={value}>{value}</option>
      //     ))}
      //   </select>

      //   <button onClick={handleFilter}>Применить фильтр</button>
      // </div>
//       <button onClick={clickPrev} disabled={offset === 0}>{'Назад'}</button>
//       <button onClick={clickNext} disabled={!hasMore}>{'Вперед'}</button>
//       <ol>{list}</ol>

   
//     </div>
//   );
// };

// export default MyComponent;