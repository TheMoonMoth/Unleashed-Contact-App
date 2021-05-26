import React from 'react';
import './styles.css';

interface ContactFormProps {
  handleAddContact: Function,
}

declare type InputType = 'currentName' | 'currentNumber'

export class ContactForm extends React.Component<ContactFormProps, any> {
  constructor(props: ContactFormProps) {
    super(props)
    this.state = {
      currentName: '',
      currentNumber: '',
    }
  }

  handleInputChange = (input: InputType, value: string) => {
    this.setState({ [input]: value })
  }

  nameIsValid = () => {
    // Make sure this.state.currentName is at least 1 characters long and is String
    return this.state.currentName.length > 0; 
  }

  numberIsValid = () => {
    // Make sure this.state.currentNumber is 10 numbers long
    // Pontential to add other criteria
    return true; // always true for development
  }

  resetState = () => {
    this.setState({
      currentName: '',
      currentNumber: '',
    })
  }

  handleSubmit = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    if (!this.nameIsValid()) {
      // throw error here to be picked up by UI element
      return
    }
    if (!this.numberIsValid()) {
      // throw error here to be picked up by UI element
      return
    }

    const newContact = {
      name: this.state.currentName,
      number: this.state.currentNumber,
    }
    this.props.handleAddContact(newContact);
    this.resetState();
  }

  render() {
    return (
      <form className='contactFormContainer' onSubmit={this.handleSubmit} >
        <h3 className='contactFormHeaderText'>Add New Contact</h3>
        <div className='contactFormInputContainer' >
          <input placeholder="name" value={this.state.currentName}onChange={e => this.handleInputChange('currentName', e.target.value)} />
          <input placeholder="phone number" value={this.state.currentNumber}onChange={e => this.handleInputChange('currentNumber', e.target.value)} />
          <input type='submit' value='Add' />
        </div>
      </form>
    )
  }
}