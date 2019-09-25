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
            <td rowspan="4" className="stylecenter">보내는 분</td>
            <td className="stylecenter widthnar">성명</td>
            <td className="styleright widthlong"></td>
            <td className="stylecenter widthnar">내용물</td>
            <td colspan="3" className="styleright widthlong"></td>
          </tr>
          <tr>
            <td className="stylecenter widthnar">전화</td>
            <td className="widthlong"></td>
            <td colspan="4">안심소포 웅앵옹</td>
          </tr>
          <tr>
            <td rowspan="2" className="stylecenter widthnar">주소</td>
            <td rowspan="2" className="styleright"></td>
            <td className="stylecenter widthnar">착불소포</td>
            <td className="styleright widthnar">원</td>
            <td className="stylecenter widthnar">안심(보험)</td>
            <td className="styleright widthnar">만원</td>
          </tr>
          <tr>
            <td className="stylecenter">파손주의</td>
            <td className="stylecenter">취급주의</td>
            <td className="stylecenter">대금교환</td>
            <td className="stylecenter">웅앵웅</td>
          </tr>
          <tr>
            <td rowspan="3" className="stylecenter">받는 분</td>
            <td className="stylecenter widthnar">성명</td>
            <td colspan="5" className="widthlong"></td>
          </tr>
          <tr>
            <td className="stylecenter widthnar">전화</td>
            <td colspan="5" className="widthlong"></td>
          </tr>
          <tr>
            <td className="stylecenter widthnar">전화</td>
            <td colspan="5" className="widthlong"></td>
          </tr>
        </table>
      </div>
    )
  }
}

export default Post;