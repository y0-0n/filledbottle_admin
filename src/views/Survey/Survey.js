import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Input, Table, } from 'reactstrap';

const questionCount = 3

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question_no : 1,
    };
  }

  componentWillMount() {
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
    console.log(this.state.question_no)
    if (this.state.question_no >= questionCount) {
        alert(this.state.question_no)
    } else {
        this.setState({
          question_no : this.state.question_no + 1,
        })
    }
  }

  render() {
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
                <div className="survey_card">
                  <div className="survey_explain">
                    다음은 귀하의 기분을 묻는 질문입니다. <br></br>
                    지난 2주간 각 문항에 해당하는 증상들을어느 정도로경험하였는지 해당하는 번호에 표시하여 주세요.
                  </div>
                  {this.state.question_no === 1 ? 
                  <div className="survey_content">
                    <div className="content_question">
                      <span>질문 : </span>
                      <span>(지난 2주간) 하루 중 대부분의 시간동안 울적했다.</span>
                    </div>
                    <div className="content_answers">
                      <label for="q1-1">
                        <input id="q1-1" type="radio" name="q1" />
                        <div className="answer_box">
                          <span>질문에 대한 대답 1</span>
                        </div>
                      </label>
                      <label for="q1-2">
                        <input id="q1-2" type="radio" name="q1"/>
                        <div className="answer_box">
                          <span>질문에 대한 대답 2</span>
                        </div>
                      </label>
                      <label for="q1-3">
                        <input id="q1-3" type="radio" name="q1"/>
                        <div className="answer_box">
                          <span>질문에 대한 대답 3</span>
                        </div>
                      </label>
                      <label for="q1-4">
                        <input id="q1-4" type="radio" name="q1"/>
                        <div className="answer_box">
                          <span>질문에 대한 대답 4</span>
                        </div>
                      </label>
                    </div>
                  </div> : ""}

                  {this.state.question_no === 2 ? 
                  <div className="survey_content">
                    <div className="content_question">
                      <span>질문 : </span>
                      <span>두번째 질무ㄴ이다 하루 중 대부분의 시간동안 울적했다.</span>
                    </div>
                    <div className="content_answers">
                      <label for="q1-1">
                        <input id="q1-1" type="radio" name="q1" />
                        <div className="answer_box">
                          <span>질문에 대한 대답 1</span>
                        </div>
                      </label>
                      <label for="q1-2">
                        <input id="q1-2" type="radio" name="q1"/>
                        <div className="answer_box">
                          <span>질문에 대한 대답 2</span>
                        </div>
                      </label>
                      <label for="q1-3">
                        <input id="q1-3" type="radio" name="q1"/>
                        <div className="answer_box">
                          <span>질문에 대한 대답 3</span>
                        </div>
                      </label>
                      <label for="q1-4">
                        <input id="q1-4" type="radio" name="q1"/>
                        <div className="answer_box">
                          <span>질문에 대한 대답 4</span>
                        </div>
                      </label>
                    </div>
                  </div> : ""}

                  {this.state.question_no === 3 ? 
                  <div className="survey_content">
                    <div className="content_question">
                      <span>질문 : </span>
                      <span>3번째 질문 하루 중 대부분의 시간동안 울적했다.</span>
                    </div>
                    <div className="content_answers">
                      <label for="q1-1">
                        <input id="q1-1" type="radio" name="q1" />
                        <div className="answer_box">
                          <span>질문에 대한 대답 1</span>
                        </div>
                      </label>
                      <label for="q1-2">
                        <input id="q1-2" type="radio" name="q1"/>
                        <div className="answer_box">
                          <span>질문에 대한 대답 2</span>
                        </div>
                      </label>
                      <label for="q1-3">
                        <input id="q1-3" type="radio" name="q1"/>
                        <div className="answer_box">
                          <span>질문에 대한 대답 3</span>
                        </div>
                      </label>
                      <label for="q1-4">
                        <input id="q1-4" type="radio" name="q1"/>
                        <div className="answer_box">
                          <span>질문에 대한 대답 4</span>
                        </div>
                      </label>
                    </div>
                  </div> : ""}
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

