import React from 'react';
import { ContactForm } from '../components/ContactForm'
import { ContactList } from '../components/ContactList';

import contacts from '../data/contacts.json' 

export interface Contacts {
  [index: number]: { name: string, number: string }
}

export interface ContactType {
  name: string,
  number: string,
}

interface ContactJson {
  contacts: Array<ContactType>
}

interface ContactPageProps {} 
interface ContactPageState {
  contacts: ContactJson,
}

export class ContactPage extends React.Component<ContactPageProps, ContactPageState> {
   constructor(props: ContactPageProps) {
     super(props)
     this.state = {
       contacts: contacts,
     }
   }

   formatNumber = (input: string) => {
    const formattedNumber = [];
    const splitNumber = input.split('');
    splitNumber.splice(0, 2);
    formattedNumber.push('(' + splitNumber.splice(0, 3).join('') + ')' + ' ');
    formattedNumber.push(splitNumber.splice(0, 3).join('') + '-');
    formattedNumber.push(splitNumber.splice(0, 4).join(''));
    return formattedNumber.join('').toString();
   }

   handleAddContact = (newContact: ContactType) => {
    this.setState((prevState: ContactPageState) => ({
        contacts: {
          contacts: [...prevState.contacts.contacts, newContact]
        }
      }
    ))
   }

   handleRemoveContact = (index: number) => {
    this.setState((prevState: ContactPageState) => {
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