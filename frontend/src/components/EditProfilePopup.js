import React, { useContext, useEffect, useState } from 'react'
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

      // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

    // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }


  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm
    name="edit"
    textTitle="Редактировать профиль"
    textButton="Сохранить"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    >
      <input
        onChange={handleChangeName}
        id="popup-name"
        minLength="2"
        maxLength="40"
        type="text"
        name="name"
        placeholder="Ваше имя"
        className="popup__item popup__item_type_name"
        required
        value={name || ''}
      ></input>
      <span id="input-edit-name-error" className="popup__error" />
      <input
        onChange={handleChangeDescription}
        id="popup-about"
        required
        minLength="2"
        maxLength="200"
        type="text"
        name="about"
        placeholder="Сфера деятельности"
        className="popup__item popup__item_type_job"
        value={description || ''}
      ></input>
      <span id="input-job-error" className="popup__error" />
    </PopupWithForm>
  );
}