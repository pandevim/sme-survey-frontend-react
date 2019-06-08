import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';

import { Container } from 'reactstrap';
import { Button, Spinner, Modal } from 'reactstrap';
import { Card, CardBody, CardTitle, CardHeader, CardFooter } from 'reactstrap';

import routeFormEntry from '../Routes/FormEntry';
import API from '../Utils/Api.js';

import FormUserDetails from './FormUserDetails';
import FormUserSelections from './FormUserSelections';

import '../App.css'

class FormEntry extends Component {
	constructor(  ) {
		super(  );

		this.collectValues = this.collectValues.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = {
      info: {},
      values: {},
      allChecked: false,
      modal: false
    };
	}

  collectValues( value, name ) {
    if ( name === 'info' )
      this.setState(state => ({ info: value }))
    else if ( name === 'values' )
      this.setState(state => ({ values: value }))
  }

  // TODO: use componentDidMount()
  // TODO: async await
  handleSubmit ( ) {
    let params = {
      info: this.state.info,
      values: this.state.values
    };
    // let spreadsheetId = '/1pbEG_HGrhKsh8seYF4-7h-5Wiq6PBVvKWqZjuitQmJw';
    let spreadsheetId = `/api`;
    
    API.post(spreadsheetId, { params })
      .then(res => console.log(JSON.parse(res.config.data)))
      .then(() => this.setState({ allChecked: true }))
      .catch(err => console.log(err))

    this.setState(prevState => ({ modal: !prevState.modal }))
  }

  render () {
    if ( this.state.allChecked ) {
      return (
        <div>
          <Route path={routeFormEntry[0].path} component={routeFormEntry[0].component} />
          <Redirect to={routeFormEntry[0].path} />
        </div>
      )
    }

    const stylish = {
      width: '5rem', 
      height: '5rem', 
      color: 'lightblue',
      marginLeft: '42%',
    }

    return (
      <Container>
        <Card>
          <CardHeader tag="h2">
            <CardTitle>Form</CardTitle>
          </CardHeader>
          <CardBody>
            <FormUserDetails changeValue={this.collectValues} /><br />
            <FormUserSelections changeValue={this.collectValues} />
          </CardBody>
          <CardFooter>
            <Button type='submit' style={{ width:'100%' }} onClick={this.handleSubmit} >Submit</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <Spinner style={ stylish } />
            </Modal>
          </CardFooter>
        </Card>
      </Container>
    );
  }
}

export default FormEntry;