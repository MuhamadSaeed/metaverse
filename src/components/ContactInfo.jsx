import React from 'react';

const ContactInfo = ({ email, phone }) => {
  return (
    <div className="ContactInfo">
      <p><span className="icon">📧</span> {email}</p>
      <p><span className="icon">📞</span> {phone}</p>
      <p><span className="icon">🌐</span> العربية </p>
    </div>
  );
};

export default ContactInfo;
