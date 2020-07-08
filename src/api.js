import axios from "axios";
import { parseJSON } from "date-fns/esm";

const api = axios.create({
  baseURL: "http://bnbnong.com:4000",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
  },
});

export const API = {
  getList: (p) =>
    api.get(`/api/product/list/open/${p}`, {
      method: "GET",
    }),
  getDetail: (p) =>
    api.get(`/api/product/detail/open/${p}`, {
      method: "GET",
    }),
  getUserFamilyCategory: (id) =>
    api.get(`/api/product/userFamilyCategory`, {
      method: "POST",
    }),
};

export const API_LIST = {
  getUserFamilyCategory: () =>
    api.get(`/api/product/userFamilyCategory`, {
      method: "POST",
    }),
    getProduct:({
      pageNumbers: page,
      keywordP: name,
      family,
      category,
      stateP: state,
    }) => {
      return api
        .request("/product/list", {
          method: "POST",
          data: JSON.stringify({
            page,
            name,
            family,
            category,
            state,
          }),
          //  JSON.parse(
          //   `{"page":${page}, "name":"${name}","family":${family},"category":${category},"state":${state}}`
          // ),
        })
        .then((response) => {
          console.log(response);
        });
  },
   
       
  getProductFamily: (category) =>
    api.get(`/api/product/familyList/${category}`, {
      method: "GET",
    }),
  getExcel: () =>
    api.get(`/api/product/excel`, {
      method: "GET",
    }),
  getStock: () =>
    api.get(`/api/stock/sum`, {
      method: "POST",
    }),
  getStateCount: () =>
    api.get(`/api/product/stateCount`, {
      method: "GET",
    }),
  getTotal: ({ keywordP: name, family, category, stateP: state }) =>
    api.get(`/product/total/`, {
      method: "POST",
      data: `name:"${name}",family:${family},category:${category},state:${state}`,
    }),
};

export const FETCH = {
  getProduct: (props) => {
    const {
      keywordP: name,
      pageNumbers: page,
      family,
      category,
      stateP,
    } = props;
    return fetch(process.env.REACT_APP_HOST + "/product/list", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        page,
        name,
        family,
        category,
        state: stateP,
      }),
    })
      .then((response) => {
        if (response.status === 401) {
          return Promise.all([401]);
        } else {
          return Promise.all([response.status, response.json()]);
        }
      })
      .then((data) => {
        return data;
      });
  },

  getTotal : (props) => {
    const {keywordP:name ,category,family,stateP} =props;
    return     fetch(process.env.REACT_APP_HOST + "/product/total/", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(
        {
          name, family, category, state: stateP
        }
      )
    })
    .then(response => {
      if (response.status === 401) {
        return Promise.all([401])
      } else {
        return Promise.all([response.status, response.json()]);
      }
    })
    .then(data=>data[1][0])
  },

  getUserFamilyCategory : () =>{
    return fetch(process.env.REACT_APP_HOST + "/api/product/userFamilyCategory", {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then(response => {
        if (response.status === 401) {
          return Promise.all([401])
        } else {
          return Promise.all([response.status, response.json()]);
        }
      })
      .then(data=>data[1])
  },
  getStock: (props) => {
    const {pageNumbers:page,keywordP:name ,category,family,stateP} =props;

    return     fetch(process.env.REACT_APP_HOST + "/api/stock/sum", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(
        {
          page, name, family, category
        }
      )
    })
      .then(response => {
        if (response.status === 401) {
          return Promise.all([401])
        } else {
          return Promise.all([response.status, response.json()]);
        }
      })
      .then(data=>data)
  },
  getExcel : () => {
    return fetch(process.env.REACT_APP_HOST + "/api/product/excel", {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then(response => {
        if (response.status === 401) {
          return Promise.all([401])
        } else {
          return Promise.all([response.status, response.json()]);
        }
      })
      .then(data=>data)
  },

  getProductFamily : ({category}) =>{
    return     fetch(process.env.REACT_APP_HOST + "/api/product/familyList/"+category, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then(response => {
        if (response.status === 401) {
          return Promise.all([401])
        } else {
          return Promise.all([response.status, response.json()]);
        }
      })
      .then(data=>data[1])
  }
};
