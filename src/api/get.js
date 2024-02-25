// import axios from 'axios';
// import md5 from 'md5';

// const currentUrl = 'https://api.valantis.store:41000/';
// const currentPassword = 'Valantis';

// const currentDate = new Date();
// const currentTimestamp = currentDate.toISOString().slice(0, 10).replace(/-/g, '');

// const authString = `${currentPassword}_${currentTimestamp}`;
// const xAuth = md5(authString);
// const currentHeaders = {
//     headers: {
//         'X-Auth': xAuth,
//         'Content-Type': 'application/json'
//     }
// }

// const getIds = async (offset = 0, limit = 50) => {
//     try {
//         const { data } = await axios.post(currentUrl, {
//             "action": "get_ids",
//             "params": { "offset": offset, "limit": limit }
//         }, currentHeaders);
//         return data.result
//     } catch (e) {
//         console.error(e);
//     }

// };

// const getItems = async (ids) => {
//     try {
//         const { data } = await axios.post(currentUrl, {
//             "action": "get_items",
//             "params": {"ids": ids}
//         }, currentHeaders);
//         return data.result

//     } catch (e) {
//         console.error(e);
//     }
// }
// // // функция юужет принимать какой то  объект фильтр 
// const filterItems = async (filters) => {
//     try {
//         const { data } = await axios.post(currentUrl, {
//             "action": "filter",
//             "params": filters
//         }, currentHeaders);
//         return data.result;
//     } catch (error) {
//         console.error(error);
//     }
// };

// const getFields = async (field, offset = 0, limit = 10) => {
//     try {
//         const { data } = await axios.post(currentUrl, {
//             "action": "get_fields",
//             "params": { "field": field, "offset": offset, "limit": limit }
//         }, currentHeaders);
//         return data;
//     } catch (e) {
//         console.error(e);
//     }
// };
  

// export { getIds, getItems, getFields, filterItems }; 
import axios from 'axios';
import md5 from 'md5';

const currentUrl = 'https://api.valantis.store:41000/';
const currentPassword = 'Valantis';

const currentDate = new Date();
const currentTimestamp = currentDate.toISOString().slice(0, 10).replace(/-/g, '');

const authString = `${currentPassword}_${currentTimestamp}`;
const xAuth = md5(authString);
const currentHeaders = {
    headers: {
        'X-Auth': xAuth,
        'Content-Type': 'application/json'
    }
}

const getIds = async (offset = 0, limit = 50) => {
    try {
        const { data } = await axios.post(currentUrl, {
            "action": "get_ids",
            "params": { "offset": offset, "limit": limit }
        }, currentHeaders);
        return data.result
    } catch (e) {
        console.error(e);
    }

};

const getItems = async (ids) => {
    try {
        const { data } = await axios.post(currentUrl, {
            "action": "get_items",
            "params": {"ids": ids}
        }, currentHeaders);
        return data.result.filter((item, index, self) =>
            index === self.findIndex((t) => (
                t.id === item.id
            ))
        );
    } catch (e) {
        console.error(e);
    }
}

const filterItems = async (filters, offset = 0, limit = 50) => {
    try {
        const { data } = await axios.post(currentUrl, {
            "action": "filter",
            "params": filters
        }, currentHeaders);
        return data.result.slice(offset, offset + limit);
    } catch (error) {
        console.error(error);
    }
};

const getFields = async (field, offset = 0, limit = 50) => {
    try {
        const { data } = await axios.post(currentUrl, {
            "action": "get_fields",
            "params": { "field": field, "offset": offset, "limit": limit }
        }, currentHeaders);
        return data;
    } catch (e) {
        console.error(e);
    }
};

const getFieldValues = async (field, offset = 0, limit = 50) => {
    try {
        const { data } = await axios.post(currentUrl, {
            "action": "get_fields",
            "params": { "field": field, "offset": offset, "limit": limit }
        }, currentHeaders);
        return data.result;
    } catch (e) {
        console.error(e);
    }
};
  
export { getIds, getItems, getFields, filterItems, getFieldValues};