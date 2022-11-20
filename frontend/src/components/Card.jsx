import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

const Card = props => {
  const { cardId, card, onCardClick, title, src, likesAmount, onCardDelete, onCardLike } = props;
  // Подписываемся на контекст
  const currentUser = useContext(CurrentUserContext);
  
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;
  
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i === currentUser._id);

  // Создаём переменную для кнопки удаления
  const cardDeleteButtonClassName = (
    `element__delete ${isOwn ? "element__delete_visible" : ""}`
  );

  // Создаём переменную для кнопки лайка
  const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active' : ""}`; 

  return (
    <li className="element" key={cardId}>
      <div className="element__info">
        <button 
        type="button" 
        className={cardDeleteButtonClassName}
        onClick={() => onCardDelete(card)}>
        </button>
        <img className="element__image" src={src} alt={title}
        //Передаем функцию, которая открывает при клике изображение карточки
        onClick={() => {onCardClick(card)}}/>
        <div className="element__footer">
          <h2 className="element__title">{title}</h2>
          <div className="element__like-counter">
            <button 
            type="button" 
            className={cardLikeButtonClassName}
            onClick={() => onCardLike(card)}>
            </button>
            <span className="element__like-amount">{likesAmount}</span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Card;