import React from 'react';
import './styles.css';

export const ContactList = (props: any) => {
  const { contacts, formatNumber } = props;
  return contacts.map((contact: any, index: number) => (
    <div className="contactItem" key={`${contact.name} + ${contact.number}`}>
      <p className="contactItemDetail" >{contact.name}</p>
      <p className="contactItemDetail">{formatNumber(contact.number)}</p>
      <button onClick={() => props.handleRemoveContact(index)}>X</button>
    </div>
  ))
}