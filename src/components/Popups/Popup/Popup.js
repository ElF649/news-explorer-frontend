import React from 'react';
import './Popup.css';

function Popup({ isOpen, onClose, children }) {
  return (
    <div className={isOpen ? 'popup popup__is-open' : 'popup'}>
      <div className="popup__content">
      <button
        className="popup__close-button"
        onClick={onClose}
        type="submit"
      />
        {children}
      </div>
      <div
        className='popup__overlay'
        onClick={onClose}>
      </div>
    </div>
  );
}

export default Popup;
