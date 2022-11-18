import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = props => {
    const { isOpen, onClose, onAddCard } = props;

    //Добавляем стейт-переменные
    const [сardName, setCardName] = useState("");
    const [cardLink, setCardLink] = useState("");

    //Обработчики изменения инпутов для обновления стейтов
    function handleCardNameChange(evt) {
      setCardName(evt.target.value);
    }

    function handleCardLinkChange(evt) {
      setCardLink(evt.target.value);
    } 
  
    //После загрузки данных из API они будут использованы в управляемых компонентах
    useEffect(() => {
      setCardName("");
      setCardLink("");
    }, [isOpen]);
  
    function handleSubmit(evt) {
      // Запрещаем браузеру переходить по адресу формы
      evt.preventDefault();
      // Передаём значения управляемых компонентов во внешний обработчик
      onAddCard({
        name: сardName,
        link: cardLink,
      });
    }

    return (
      <PopupWithForm
        name="addCard"
        title="Новое место"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        buttonTitle="Создать"
      >
        <div className="popup__field">
          <input
            name="name" id="place" type="text" required
            className="popup__input popup__input_place"
            placeholder="Название" minLength="2" maxLength="30"
            onChange={handleCardNameChange}
            value={сardName} />
          <span id="place-error" className="popup__error-visible"></span>
        </div>
    
        <div className="popup__field">
          <input
            name="link" id="link" type="url" required
            className="popup__input popup__input_link"
            placeholder="Ссылка на картинку"
            onChange={handleCardLinkChange}
            value={cardLink} />
          <span id="link-error" className="popup__error-visible"></span>
        </div>
      </PopupWithForm>
      )
}

export default AddPlacePopup;