import React from "react";

const ImagePopup = props => {
  const { name, card, isImageOpen, onClose } = props;

  return (
    //ClassName в зависимости от того, открыли ли изображение
    <div className={`popup popup_${name} ${isImageOpen && "popup_opened"}`}>
      <div className="popup__container popup__container_open-image">
        <figure className="popup__image-block">
          <button type="button" aria-label="Закрыть" className="popup__close" onClick={onClose} />
          <img src={card.link} alt={card.name} className="popup__image-element" />
          <figcaption className="popup__place-title">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  ); 
}

export default ImagePopup;