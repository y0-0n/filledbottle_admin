import React, { Component } from 'react';

class LandingPage extends Component {
  render() {
    return (
      <div className="app align-items-center">
        <link rel="stylesheet" type="text/css" href="css/LandingPage.css"></link>

        <section id="main" className="fullscreen">
          <header>
            <img className="logo" src="img/LDlogo.png" />
          </header>
          <div className="main_title">
            <div>
              <img className="mainImg" src="img/mainLandingPage.png"/>
            </div>
            <div>
              <button className="main_btn" onClick={()=> {this.props.history.push('/main/home')}}>지금 시작하기</button>
            </div>
          </div>
          <img className="mainImg2" src="img/mainLandingPage2.png"/>
        </section>

        <section id="one">
          <img className="oneImg" src="img/oneImg.png" />
          <img className="oneImg" src="img/oneImg2.png" />
          <img className="oneImg" src="img/oneImg3.png" />
          <img className="oneImg" src="img/bnbn1.png" />
          <img className="oneImg" src="img/bnbn2.png" />
          <img className="oneImg" src="img/bnbn3.png" />
          <img className="oneImg" src="img/bnbn4.png" />
        </section>

        <section id="foot" className="fullscreen">
          <div className="foot_title">
            <div>
              <img className="footImg" src="img/footImg.png"/>
            </div>
            <div>
              <textarea className="foot_text" placeholder='연락처와 성함을 적어주시면 상담을 도와드리겠습니다.'></textarea>
              <button className="foot_btn">상담 신청하기</button>
            </div>
          </div>
          <img className="footImg2" src="img/footImg2.png"/>
        </section>
        
      </div>
    );
  }
}

export default LandingPage;
