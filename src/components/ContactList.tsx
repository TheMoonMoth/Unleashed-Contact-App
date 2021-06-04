import React from 'react';
import './styles.css';

import type { ContactType } from '../pages/ContactPage'

interface ContactListProps {
  contacts: Array<ContactType>,
  formatNumber: Function,
  handleRemoveContact: Function,
}

export const ContactList = (props: ContactListProps) => {
  const { contacts, formatNumber, handleRemoveContact } = props;
  return (
    <>
      {contacts.map((contact: ContactType, index: number) => (
        <div className="contactItem" key={`${contact.name} + ${contact.number}`}>
          <p className="contactItemDetail" >{contact.name}</p>
          <p className="contactItemDetail">{formatNumber(contact.number)}</p>
          <button onClick={() => handleRemoveContact(index)}>X</button>
        </div>
      ))}
    </>
  )
}