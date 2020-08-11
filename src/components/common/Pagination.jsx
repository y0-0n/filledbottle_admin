import React, { useState, useEffect } from "react";
import { Pagination , PaginationItem, PaginationLink} from 'reactstrap';
import "./Pagination.scss";

// [TODO]
const Paginations = (props) => {
    const {
      page, total
    } = props;

    const arr = [-2, -1, 0, 1, 2];
    const arr1 = [];
  
    return (
        <Pagination style={{ justifyContent: 'center' }}>
          {page === 1 ? '' :
            <PaginationItem>
              <PaginationLink previous onClick={() => { props.setPage(page-1)}} />
            </PaginationItem>
          }
          {page === 1 ? arr.forEach(x => arr1.push(x + 2)) : null}
          {page === 2 ? arr.forEach(x => arr1.push(x + 1)) : null}
          {page !== 1 && page !== 2 ? arr.forEach(x => arr1.push(x)) : null}
          {arr1.map((e, i) => {
            if (total >= page + e)
              return (<PaginationItem key={i} active={page === page + e}>
                <PaginationLink onClick={() => { props.setPage(page + e) }}>
                  {page + e}
                </PaginationLink>
              </PaginationItem>)
            return null;
          })}
          {page === total ? '' :
            <PaginationItem>
              <PaginationLink next onClick={() => { props.setPage(page + 1) }} />
            </PaginationItem>}
        </Pagination>
    );
};

export default Paginations;