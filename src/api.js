import axios from "axios";
import { parseJSON } from "date-fns/esm";

const api = axios.create({
  baseURL: "http://bnbnong.com:4000",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
    Accept: "application/json",
    'Content-Type': 'application/json;charset=UTF-8'
  },
  responseType:"json"
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
  getProduct: (page, name, family, category, state) => {
    return api.get(`/product/list`, {
      method: "post",
      data:JSON.stringify(
        {
            page, name, family, category, stateP:state
        }
      )
      
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
  getTotal: () =>
    api.get(`/product/total/`, {
      method: "POST",
    }),
};
