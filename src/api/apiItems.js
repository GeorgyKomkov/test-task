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
    'Content-Type': 'application/json',
  },
};

const getIds = async (offset = 0, limit = 50, retries = 2) => {
  try {
    const { data } = await axios.post(currentUrl, {
      action: 'get_ids',
      params: { offset, limit },
    }, currentHeaders);
    return data.result;
  } catch (e) {
    if (retries > 0) {
      console.error('Ошибка при получении ID, повторная попытка...');
      return getIds(offset, limit, retries - 1);
    }
    console.error('Ошибка при получении ID, количество попыток исчерпано.');
    throw e;
  }
};
const getItems = async (ids, retries = 2) => {
  try {
    const { data } = await axios.post(currentUrl, {
      action: 'get_items',
      params: { ids },
    }, currentHeaders);
    return data.result.filter((item, index, self) => index === self.findIndex((t) => (
      t.id === item.id
    )));
  } catch (e) {
    if (retries > 0) {
      console.error('Ошибка при получении товаров, повторная попытка...');
      return getItems(ids, retries - 1);
    }
    console.error('Ошибка при получении товаров, количество попыток исчерпано.');
    throw e;
  }
};

const filterItems = async (filters, retries = 2) => {
  try {
    const { data } = await axios.post(currentUrl, {
      action: 'filter',
      params: filters,
    }, currentHeaders);
    return data.result;
  } catch (e) {
    if (retries > 0) {
      console.error('Ошибка при фильтрации , повторная попытка...');
      return filterItems(filters, retries - 1);
    }
    console.error('Ошибка при фильтрации , количество попыток исчерпано.');
    throw e;
  }
};

const getFields = async (field, offset = 0, limit = 50, retries = 2) => {
  try {
    const { data } = await axios.post(currentUrl, {
      action: 'get_fields',
      params: { field, offset, limit },
    }, currentHeaders);
    return data.result;
  } catch (e) {
    if (retries > 0) {
      console.error('Ошибка при получении полей, повторная попытка...');
      return getFields(field, offset, limit, retries - 1);
    }
    console.error('Ошибка при получении полей, количество попыток исчерпано.');
    throw e;
  }
};

export {
  getIds, getItems, getFields, filterItems,
};
