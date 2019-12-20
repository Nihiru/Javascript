import React from 'react';
import { Card, CardText, Button, CardTitle, Form, FormGroup, Label, Input } from 'reactstrap';

export default (props) => {
    return (
        <Card body className="message-form">
          <CardTitle> Welcome to Guide Map</CardTitle>
          <CardTitle>Leave a message for your location</CardTitle>
          <CardText> Thanks for stopping by !</CardText>
          {
            !props.sendingMessage && !props.sentMessage && props.haveUserLocation?
                <Form onSubmit={props.formSubmitted}>
                  <FormGroup>
                      <Label for="name">Name</Label>
                      <Input 
                      onChange={props.valueChanged}
                      type="text" 
                      name="name" 
                      id="name" 
                      placeholder="Enter a Name" />  
                  </FormGroup>
                  <FormGroup>
                      <Label for="message">Message</Label>
                      <Input 
                      onChange={props.valueChanged}
                      type="textarea" 
                      name="message" 
                      id="message" 
                      placeholder="Enter a message" />  
                      
                  </FormGroup>
                  <Button type="submit" color="info" disabled={!props.formIsValid()}>Send</Button>
                </Form> :
                props.sendingMessage || !props.haveUserLocation?
          
                <video autoPlay
                loop
                src = "https://i.giphy.com/media/BCIRKxED2Y2JO/giphy.mp4"/>:
                <CardText> Thanks for submitting</CardText>
          }
          </Card>
    )
}