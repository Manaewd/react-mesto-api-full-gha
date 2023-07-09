import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const [name, setName] = useState("");
  const [link, setLink] = useState("");


  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      name="add"
      textTitle="Новое место"
      textButton="Создать"
      nameForm="add"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="input-add-name"
        required
        minLength="2"
        maxLength="30"
        type="text"
        name="name"
        placeholder="Название"
        className="popup__item popup__item_add_name"
        value={name}
        onChange={handleChangeName}
      ></input>
      <span id="input-add-name-error" className="popup__error" />
      <input
        id="input-link"
        required
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        className="popup__item popup__item_add_url"
        value={link}
        onChange={handleChangeLink}
      ></input>
      <span id="input-link-error" className="popup__error" />
    </PopupWithForm>
  );
}