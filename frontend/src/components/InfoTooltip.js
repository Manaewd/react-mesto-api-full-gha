import React from 'react'

function InfoTooltip({ isOpen, onClose, RegSuccess, textRegistrationSuccess, textRegistrationSuccessFalse }) {
  return (
    <div
      className={`popup ${
        isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__registration">
        <button
          type="button"
          title="Закрыть"
          className="popup__button-close"
          onClick={onClose}
        ></button>
         <div
            className={`popup__registration ${RegSuccess ? "popup__registration-success" : "popup__registration-success-fail"
              }`}
          ></div>
          <h2 className="popup__registration-title">
            {RegSuccess
              ? textRegistrationSuccess
              : textRegistrationSuccessFalse}
            </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;