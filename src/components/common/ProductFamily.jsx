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
    <div>
      <link rel="stylesheet" type="text/css" href="css/CreateCopy.css"></link>
      <div className="sell-input">
        <div style={{ overflow: "hidden", backgroundColor: '#fff', padding: 20, marginBottom: '10px' }}>
          <Nav tabs>
            {categoryData.map((e, i) => {
              return <NavItem key={i}>
                <NavLink active={category === e.id} onClick={() => setCategory(e.id)} href="#">{e.name}</NavLink>
              </NavItem>
            })}
          </Nav>
          <div>
            <ul className="ul-productFamily " style={{ listStyleType: "none", }}>
              {familyData.map((e, i) => {
                return (
                  <li key={i} className="list-productFamily"
                    style={{
                      backgroundColor: family === e.id ? "#20A8D8" : "",
                      color: family === e.id ? "#fff" : "",
                      borderColor: family === e.id ? "" : "lightgray"
                    }}
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
  );
};

export default ProductFamily;