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
  
    getTotal: (props) => {
      const { keywordP: name, category, family, stateP } = props;
      return fetch(process.env.REACT_APP_HOST + "/product/total/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
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
        .then((data) => data[1][0]);
    },
  
    getUserFamilyCategory: () => {
      return fetch(
        process.env.REACT_APP_HOST + "/api/product/userFamilyCategory",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
        .then((response) => {
          if (response.status === 401) {
            return Promise.all([401]);
          } else {
            return Promise.all([response.status, response.json()]);
          }
        })
        .then((data) => data[1]);
    },
    getStock: (props) => {
      const {
        pageNumbers: page,
        keywordP: name,
        category,
        family,
        stateP,
      } = props;
  
      return fetch(process.env.REACT_APP_HOST + "/api/stock/sum", {
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
        }),
      })
        .then((response) => {
          if (response.status === 401) {
            return Promise.all([401]);
          } else {
            return Promise.all([response.status, response.json()]);
          }
        })
        .then((data) => data);
    },
    getExcel: () => {
      return fetch(process.env.REACT_APP_HOST + "/api/product/excel", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => {
          if (response.status === 401) {
            return Promise.all([401]);
          } else {
            return Promise.all([response.status, response.json()]);
          }
        })
        .then((data) => data);
    },
  
    getProductFamily: ({ category }) => {
      return fetch(
        process.env.REACT_APP_HOST + "/api/product/familyList/" + category,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
        .then((response) => {
          if (response.status === 401) {
            return Promise.all([401]);
          } else {
            return Promise.all([response.status, response.json()]);
          }
        })
        .then((data) => data[1]);
    },
  };