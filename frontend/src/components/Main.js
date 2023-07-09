import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditProfile, onAddPlace, onCardDelete, onEditAvatar, onCardLike, onCardClick, cards }) {

  const currentUser = React.useContext(CurrentUserContext);
    return (
      <main>
        <section className="profile">
          <div
            className="profile__image"
            name="avatar"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
            onClick={onEditAvatar}
          ></div>
          <div className="profile__info">
            <div className="profile__info-container">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                type={"button"}
                className="profile__edit-button"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button
            type={"button"}
            className="profile__add-button"
            onClick={onAddPlace}
          ></button>
        </section>
        <div className="elements">
          {cards.map((card) => (
            <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            />
          ))}
        </div>
      </main>
    );
  }

export default Main;
