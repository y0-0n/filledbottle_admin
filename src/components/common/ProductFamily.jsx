import React, { useEffect, useState } from "react";
import { Button, Input, Nav, NavItem, NavLink } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import _fetch from '../../fetch';
// import {getList} from './User'

const ProductFamily = () => {
  const history = useHistory()
  const [category, setCategory] = useState(1);
  const [categoryData, setCategoryData] = useState([]);
  const [family, setFamily] = useState(0);
  const [familyData, setFamilyData] = useState([]);

  useEffect(() => {
    _fetch("/api/product/familyCategory", 'GET', null, (data) => {
      setCategoryData(data)
    })
  })

  useEffect(() => {
    _fetch("/api/product/allFamily/" + category, 'GET', null, (data) => {
      setFamilyData(data)
    })    
  }, [category])

  return (
    <div className="animated fadeIn">
        <link rel="stylesheet" type="text/css" href="css/ProductList.css"></link>
      <link rel="stylesheet" type="text/css" href="css/ListCopy.css"></link>
      <div className="search-box" style={{marginBottom : 10}}>
        <div className="search-list">
          <label className="search-label">농장검색</label>
          <div className="sell-input">
            <Input className="searchbox-input" placeholder="농장 이름을 검색해주세요." style={{width: "30%"}} />
          </div>
        </div>
        <div className="search-list">
          <label className="search-label">품목군검색</label>
          <div className="sell-input">
            <div style={{overflow:"hidden"}}>
              <Nav tabs>
                {categoryData.map((e, i) => {
                  return <NavItem key={i}>
                    <NavLink active={category === e.id} onClick={()=>setCategory(e.id)} href="#">{e.name}</NavLink>
                  </NavItem>
                })}
              </Nav>
              <div>
                <ul className="ul-productFamily " style={{ listStyleType: "none", }}>
                  {familyData.map((e, i) => {
                    return (
                      <li key={i} className="list-productFamily"
                        style={{backgroundColor:family === e.id ?   "#20A8D8": "" ,
                        color: family === e.id ? "#fff": "",
                        borderColor: family === e.id ? "": "lightgray" }}
                        onClick={() => {
                          setFamily(e.id)
                        }}>{e.name}</li>
                    )
                  }
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="search-button" style={{textAlign: 'center', paddingBottom: "10px"}}>
          <Button color="primary" style={{marginRight: 10}}>검색</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductFamily;