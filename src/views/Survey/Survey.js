import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Input, Table, } from 'reactstrap';

const answerList = []

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
			question_no : 1,
      data: [],
      checkAnswer : -1,
      checkQuestion : -1,
    };
  }

  componentWillMount() {
		this.getQuestionList();
	}
	
	getQuestionList() {
    fetch(process.env.REACT_APP_HOST + "/api/survey/", {
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
      .then(data => {
        let status = data[0];
        if (status === 200)
          this.setState({ data: data[1] });
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
      })
  }


  prevQuestion() {
    console.log(this.state.question_no)
    if (this.state.question_no === 1) {
        alert('1번 문항입니다.');
        return;
    }
    this.setState({
      question_no : this.state.question_no - 1,
    })
  }

  nextQuestion() {
    if (this.state.question_no >= this.state.data.length) {
        alert(this.state.question_no)
    } else {
      let answerVal = this.state.checkAnswer
      if (answerVal === -1) {
        alert('해당 문항에 답변을 해주세요.');
        return;
      }
      answerList[this.state.checkQuestion] = answerVal;
			this.setState({
				question_no : this.state.question_no + 1,
			})
    console.log(answerList)
    }
  }

  changeStateAnswer(x, i) {
    this.setState({
      checkAnswer : x,
      checkQuestion : i
    })
    console.log(this.state.checkAnswer, this.state.checkQuestion)
  }

  render() {
		const data = this.state.data;
    return (
      <div className="animated fadeIn">
        <link rel="stylesheet" type="text/css" href="css/Survey.css"></link>
        <Row className="mb-5">
          <Col md="12" xs="12" sm="12">
            <Card>
              <CardHeader>
                설문 조사
                  </CardHeader>
              <CardBody>
								<div className="survey_explain">
									다음은 귀하의 기분을 묻는 질문입니다. <br></br>
									지난 2주간 각 문항에 해당하는 증상들을어느 정도로경험하였는지 해당하는 번호에 표시하여 주세요.
								</div>
                <div className="survey_card">
									{
										data.map((e, i) => {
											return (
												<div style={{display:(this.state.question_no-1 === i ? "block" : "none")}} className="survey_content">
													<div className="content_question">
														<span>질문 : </span>
														<span>{e.question}</span>
													</div>
													<div className="content_answers">
														<label for={"q"+i+"-1"} onClick={() => {this.changeStateAnswer(1, i);}}>
                              <input id={"q"+i+"-1"} type="radio" name="q1"/>
															<div className="answer_box">
																<span>{e.answer1}</span>
															</div>
														</label>
														<label for={"q"+i+"-2"} onClick={() => {this.changeStateAnswer(2, i);}}>
															<input id={"q"+i+"-2"} type="radio" name="q1"/>
															<div className="answer_box">
																<span>{e.answer2}</span>
															</div>
														</label>
														<label for={"q"+i+"-3"} onClick={() => {this.changeStateAnswer(3, i);}}>
															<input id={"q"+i+"-3"} type="radio" name="q1"/>
															<div className="answer_box">
																<span>{e.answer3}</span>
															</div>
														</label>
														<label for={"q"+i+"-4"} onClick={() => {this.changeStateAnswer(4, i);}}>
															<input id={"q"+i+"-4"} type="radio" name="q1"/>
															<div className="answer_box">
																<span>{e.answer4}</span>
															</div>
														</label>
													</div>
												</div>)
										})
									}
                  <div className="survey_button">
                    <Button color="ghost-primary" className="prev_button" onClick={() => this.prevQuestion()}>이전</Button>
                    <Button color="primary" className="next_button" onClick={() => this.nextQuestion()}>다음</Button>
                  </div>
                </div>
              </CardBody>
              <CardFooter>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )

  }
}

export default Create;

