import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Label, Table } from 'reactstrap';
import styles from './Post.css';

class Post extends Component {
  render() {
    return (
      <div>
        <table id="post">
          <tr>
            <td colspan="7">우체국 택배</td>
          </tr>
          <tr>
            <td rowspan="4">보내는 분</td>
            <td>성명</td>
            <td></td>
            <td>내용물</td>
            <td colspan="3"></td>
          </tr>
          <tr>
            <td>전화</td>
            <td></td>
            <td colspan="4">안심소포 웅앵옹</td>
          </tr>
          <tr>
            <td rowspan="2">주소</td>
            <td rowspan="2"></td>
            <td>착불소포</td>
            <td>원</td>
            <td>안심(보험)</td>
            <td>만원</td>
          </tr>
          <tr>
            <td>파손주의</td>
            <td>취급주의</td>
            <td>대금교환</td>
            <td>만원</td>
          </tr>
          <tr>
            <td rowspan="3"></td>
            <td rowspan="3">받는 분</td>
            <td>성명</td>
            <td colspan="4"></td>
          </tr>
          <tr>
            <td>전화</td>
            <td colspan="4"></td>
          </tr>
          <tr>
            <td>전화</td>
            <td colspan="4"></td>
          </tr>
        </table>
      </div>
    )
  }
}

export default Post;