import React from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';
import CardContext from '../contexts/CardContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const cards = React.useContext(CardContext)

  return (
    <main className="content">
      <section className="profile">
        <button className="profile__avatar-button" type="button" onClick={props.onEditAvatar} >
          <img className="profile__avatar" src={currentUser.avatar} alt="Фотография владельца профиля" />
        </button>
        <div className="profile__info">
          <div className="profile__name-container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button hover-button" type="button" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__about">{currentUser.about} </p>
        </div>
        <button className="profile__add-button hover-button" type="button" onClick={props.onAddPlace}></button>
      </section><section aria-label="Публикация">
        <ul className="elements">
          {cards.map((card) => (
            <Card key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardDelete={props.onCardDelete}
              onCardLike={props.onCardLike} />
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Main;

