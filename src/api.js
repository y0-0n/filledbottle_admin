import axios from "axios";
import { parseJSON } from "date-fns/esm";

const api = axios.create({
  baseURL: "http://bnbnong.com:4000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});

export const API_LIST = {
  getUserFamilyCategory: () =>
    api
      .get(`/api/product/userFamilyCategory`, {
        method: "POST",
      })
      .then((response) => {
        if (response.status === 401) {
          return "Not Authorization";
        } else if (response.status === 200) {
          console.log("getUserFamilyCategory is working.. :" , response.data);
          if (response.data[1].length !== 0) return response.data;
        }
      }),
  getProduct: ({
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
      })
      .then((response) => {
        if (response.status === 401) {
          return "Not Authorization";
        } else if (response.status === 200) {
          console.log("getProduct is working.. : " , response.data);
          return response.data;
        }
      });
  },

  getProductFamily: (props) => {
    const { category } = props;
    return api
      .get(`/api/product/familyList/${category}`, {
        method: "GET",
      })
      .then((response) => {
        if (response.status === 401) {
          return "Not Authorization";
        } else if (response.status === 200) {
          console.log("getProductFamily is working.. : ", response.data);
          return response.data;
        }
      });
  },
  getExcel: (props) => {
    return api.get(`/api/product/excel`, {
      method: "GET",
    });
  },
  getStock: (props) => {
    const { pageNumbers: page, keywordP: name, category, family } = props;

    return api
      .request(`/api/stock/sum`, {
        method: "POST",
        data: JSON.stringify({
          page,
          name,
          family,
          category,
        }),
      })
      .then((response) => {
        if (response.status === 401) {
          return "Not Authorization";
        } else if (response.status === 200) {
          console.log("getStock is working.. : " ,response.data);
          return response.data;
        }
      });
  },
  getStateCount: () =>
    api
      .get(`/api/product/stateCount`, {
        method: "GET",
      })
      .then((response) => {
        if (response.status === 401) {
          return "Not Authorization";
        } else if (response.status === 200) {
          console.log("getStateCount is working.. : ", response.data);
          let stateCount = [];
          for(var i=0 ; i<3 ; i++){
            stateCount[i] = 0
          }
          response.data.map((e)=>{
            if(e.count) {
              stateCount[e.state-1] = e.count
            };
          }
          )
          return stateCount;
        }
      }),
  getTotal: (props) => {
    const { keywordP: name, category, family, stateP: state } = props;
    return api
      .request(`/product/total/`, {
        method: "POST",
        data: JSON.stringify({
          name,
          family,
          category,
          state,
        }),
      })
      .then((response) => {
        if (response.status === 401) {
          return "Not Authorization";
        } else if (response.status === 200) {
          console.log("getTotal is working.. :", response.data);

          return response.data;
        }
      });
  },
};


