import React from 'react'

function PopupWithForm({ textButton, children, textTitle, onSubmit, name, onClose, isOpen }) {
  return (
    <div
      className={`popup ${
        isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          type="button"
          title="Закрыть"
          className="popup__button-close"
          onClick={onClose}
        ></button>
        <form
          name={`${name}__form`}
          className={`popup__form popup__form-${name}`}
          onSubmit={onSubmit}
        >
          <h2 className="popup__title">{textTitle}</h2>
          {children}
          <button
            type="submit" 
            className="popup__button-save"
          >
            {textButton || 'Сохранить'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;