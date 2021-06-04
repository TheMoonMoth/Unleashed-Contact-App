import React from 'react';
import './styles.css';
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';

interface ContactFormProps {
  handleAddContact: Function,
}

interface ContactFormState {
  currentName: string,
  currentNumber: string,
  currentNumberValidated?: boolean,
  currentNameValidated?: boolean,
}

declare type InputType = 'currentName' | 'currentNumber'

export class ContactForm extends React.Component<ContactFormProps, any> {
  constructor(props: ContactFormProps) {
    super(props)
    this.state = {
      currentName: '',
      currentNameValidated: undefined,
      currentNumber: '',
      currentNumberValidated: undefined,
    }
  }

  handleInputChange = (input: InputType, value: string = '') => {
    this.setState({ [input]: value })
  }

  resetState = () => {
    this.setState({
      currentName: '',
      currentNameValidated: undefined,
      currentNumber: '',
      currentNumberValidated: undefined,
    })
  }

  validateName = async () => {
    // Basic validation that something was input for name.
    // Should add string santization as well.
    const nameIsValid = (this.state.currentName.length >= 1 && !!this.state.currentName.match(/^[A-Za-z ]+$/))
    this.setState((prevState: ContactFormState) => ({ currentNameValidated: nameIsValid }))
  }

  validateNumber = async () => {
    this.setState((prevState: ContactFormState) => ({ currentNumberValidated: isValidPhoneNumber(prevState.currentNumber) }))
  }

  handleSubmit = async (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    
    await this.validateNumber();
    await this.validateName();

    if (this.state.currentNameValidated && this.state.currentNumberValidated) {
      const newContact = {
        name: this.state.currentName,
        number: this.state.currentNumber,
      }
      this.props.handleAddContact(newContact);
      this.resetState();
    }
  }

  render() {
    return (
      <form className='contactFormContainer' onSubmit={this.handleSubmit} >
        <h3 className='contactFormHeaderText'>Add New Contact</h3>
        <div className='contactFormInputContainer' >
          <input placeholder="Enter full name" value={this.state.currentName}onChange={e => this.handleInputChange('currentName', e.target.value)} />
          <PhoneInput
            defaultCountry="US"
            countries={["US"]}
            international={false}
            placeholder="Enter phone number"
            value={this.state.currentNumber}
            onChange={phoneNumber => this.handleInputChange('currentNumber', phoneNumber)}
          />
          <input type='submit' value='Add' />
        </div>
        <div className="inputMessagesContainer">
        {this.state.currentNameValidated === false && (
          <p className="inputErrorMessage">Please enter a valid name</p>
        )}
        {this.state.currentNumberValidated === false && (
          <p className="inputErrorMessage">Please enter a valid phone number</p>
        )}
        </div>
      </form>
    )
  }
}