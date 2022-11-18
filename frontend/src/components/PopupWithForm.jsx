import React from "react";

const PopupWithForm = props => {
  const { name, title, children, buttonTitle, isOpen, onClose, onSubmit } = props;
  
  return (
    //В зависимости от открытия попапа меняется className
    <div className={`popup popup_${name} ${isOpen && "popup_opened"}`} onSubmit={onSubmit}>
      <div className="popup__container">
        <button className="popup__close" aria-label="Закрыть" type="button" onClick={onClose} />

        <form className="popup__form"
        name={`${name}_form`}>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button className="popup__button"
          type="submit">{buttonTitle}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;