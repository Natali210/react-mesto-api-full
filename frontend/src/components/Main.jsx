import { useContext } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

const Main = props => {
  const { onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardDelete, onCardLike } = props;
  
  // Подписываемся на контекст, чтобы использовать нужные поля из полученного объекта текущего пользователя
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <section className="profile root__profile">
      <div className="profile__avatar-container">
        <img className="profile__avatar" src={currentUser.avatar} alt="Аватар пользователя" />
        <div className="profile__avatar-overlay" onClick={onEditAvatar}></div>
      </div>
        <div className="profile__info">
        <div className="profile__about">
          <h1 className="profile__title">{currentUser.name}</h1>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
          <button type="button" aria-label="Редактировать профиль" className="profile__edit" 
          onClick={onEditProfile} />
        </div>
        <button type="button" aria-label="Добавить новый профиль" className="profile__add" 
        onClick={onAddPlace}/>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              src={card.link}
              title={card.name}
              onCardClick={onCardClick}
              likesAmount={card.likes.length}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />))
          }
        </ul>
      </section>

    </>
  )
}

export default Main;