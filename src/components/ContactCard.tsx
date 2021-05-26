import React from 'react';
import './styles.css'

export const ContactCard = (contact: { name: string, number: string }) => {
  return (
    <div className="contactItem">
      <p className="contactItemDetail" >{contact.name}</p>
      <p className="contactItemDetail">{contact.number}</p>
    </div>
  )
}