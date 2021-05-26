import React from 'react';
import { ContactForm } from '../components/ContactForm'
import { ContactList } from '../components/ContactList';

import contacts from '../data/contacts.json' 

export interface Contacts {
  [index: number]: { name: string, number: string }
}

interface ContactType {
  name: string,
  number: string,
}

export class ContactPage extends React.Component<any, any> {
   constructor(props: any) {
     super(props)
     this.state = {
       contacts: contacts,
     }
   }

   formatNumber = (number: any) => {
    const formattedNumber = [];
    const splitNumber = number.split('');
    formattedNumber.push('(' + splitNumber.splice(0, 3).join('') + ')' + ' ');
    formattedNumber.push(splitNumber.splice(0, 3).join('') + '-');
    formattedNumber.push(splitNumber.splice(0, 4).join(''));
    return formattedNumber.join('').toString();
   }

   handleAddContact = (newContact: ContactType) => {
    this.setState((prevState: any) => ({
        contacts: {
          contacts: [...prevState.contacts.contacts, newContact]
        }
      }
    ))
   }

   handleRemoveContact = (index: number) => {
    this.setState((prevState: any) => {
      const newList = prevState.contacts.contacts;
      newList.splice(index, 1);
      return {
        contacts: {
          contacts: [...newList]
      }}
    })
   }

   render() {
     return (
      <>
        <ContactForm handleAddContact={this.handleAddContact} />
        <ContactList
          contacts={this.state.contacts.contacts}
          formatNumber={this.formatNumber}
          handleRemoveContact={this.handleRemoveContact}
        />
      </>
     )
   }
}