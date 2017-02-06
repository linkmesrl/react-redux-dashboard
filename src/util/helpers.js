import _ from 'lodash';

export const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const getValueOfFirstKey = (obj) => {
  for(let key in obj) {
    if(obj.hasOwnProperty(key)) { return obj[key]; };
    break;
  }
}

export const mergeByProperty = (arr1, arr2, prop) => {
  _.each(arr2, el2 => _.remove(arr1, (el1) => el1[prop] === el2[prop]));
  return _.sortBy(arr1.concat(arr2), prop);
}

export const objKeysToArr = (obj) => {
  return Object.keys(obj);
};

export const isValueInArr = (value, arr) => {
  return value === arr.filter(el => el === value)[0];
}

export const setObjKeysFromArr = (arr, obj) => {
  for(let key in obj) {
    if(obj.hasOwnProperty(key)) {
      obj[key] = (arr.indexOf(key) !== -1);
    }
  }
  return obj;
};

export const getArrFromObjFiltered = (arr, key) => {
  const arrFiltered = arr.filter(el => el[key]);
  return arrFiltered.map(el => {
    return el.value;
  })
}

export const getArrFromObjKeys = (obj) => {
  let result = [];
  for(let key in obj) {
    if(obj[key] === true) {
      result.push(key);
    }
  }
  return result;
};

/* Api */

export const fetchUrl = (url) => {
  return fetch(url)
  .then((res) => {
    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }
    return res.json();
  });
}
