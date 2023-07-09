import { useRef } from 'react';
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar  }) {

  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name="avatar"
      textTitle="Обновить аватар"
      textButton="Сохранить"
      nameForm="avatar"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__item popup__item_enter_avatar"
        ref={avatarRef}
        type="url"
        name="avatar-image"
        id="input-avatar"
        placeholder="Ссылка на картинку"
        required
      ></input>
      <span className="popup__error" id="input-avatar-error" />
    </PopupWithForm>
  );
}