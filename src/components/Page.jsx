import React, { Component } from 'react';

import { Form, FormGroup, Label, Button } from 'reactstrap';
import { Card, CardBody, CardTitle, CardHeader, CardFooter } from 'reactstrap';

import InputGroupRadio from './InputGroupRadio.jsx';

class Page extends Component {
  constructor(props) {
    super(props);

    this.handleInputGroupRadioChange = this.handleInputGroupRadioChange.bind(this);

    this.state = {
      sheetData: {},
      rawData: {}
    };
  }

  // TODO: improve method
	handleInputGroupRadioChange ( question, value, sheetId ) {
    this.setState({
      sheetData: {
        ...this.state.sheetData, 
        [question]: value
      }
    }, () => {
      this.setState({
        rawData: Object.keys(this.state.sheetData).map( question => {
          return this.state.sheetData[question];
        })
      }, () => {

        // Callback to FormUserSelection
        this.props.onPageEntry(sheetId, this.state.rawData);
      })
    });
	}

  createQuestions( questions, id ) {
    return (
      <Form>
        {questions.map((question, index) => {
          return (
            <FormGroup key={index}>
              <Label for={`q${index}`}>{`${index+1}. ${question.text}`}</Label>
              <InputGroupRadio 
                choices={question.choices} 
                id={id} 
                index={index} 
                name={`q${index}`} 
                onRadioSelect={this.handleInputGroupRadioChange}
              />
            </FormGroup>
          );
        })}
      </Form>
    );
  }

  prevStep () {
    alert('Previous Step');
  }
  
  next () {
    alert('Previous Step');
  }

  render () {


    return (
      <div className="pageCard">
        <Card>
          <CardHeader tag="h5">
            <CardTitle>{this.props.page.title}</CardTitle>
          </CardHeader>
          <CardBody>
            {this.createQuestions( 
              this.props.page.questions, this.props.page.id 
            )}
          </CardBody>
          <CardFooter>
            <Button onClick={this.prevStep}>Previous</Button>
            <Button style={{ float: 'right' }} onClick={this.nextStep}>Next</Button>
          </CardFooter>
        </Card>
        <br />
      </div>
    );
  }
}


export default Page;

