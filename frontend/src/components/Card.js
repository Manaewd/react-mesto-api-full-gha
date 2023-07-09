import { useContext } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ onCardClick, onCardDelete, card, onCardLike }) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  function handleCardClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  return (
    <div className="element">
      {isOwn &&
        <button
          type={"button"}
          className="element__trash-button"
          onClick={handleDeleteClick}>
        </button>}
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="element__container">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__container-like">
          <button
            type="button"
            className={`element__button ${isLiked ? 'element__button_type_active' : ''}`}
            aria-label="like"
            onClick={handleLikeClick}
          ></button>
          <p className="element__like-meter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
