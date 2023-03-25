import React from 'react';

function Modal({ onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h1>Modal Title</h1>
        <p>Modal Content</p>
        <button onClick={onClose}>Close Modal</button>
      </div>
    </div>
  );
}



export default Modal;
