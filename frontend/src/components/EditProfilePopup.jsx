import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useContext, useState, useEffect } from "react";

const EditProfilePopup = props => {
  const { isOpen, onClose, onUpdateUser } = props;

  //Подписываемся на контекст
  const currentUser = useContext(CurrentUserContext);

  //Добавляем стейт-переменные
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  //Обработчики изменения инпутов для обновления стейтов
  function handleNameChange(evt) {
    setName(evt.target.value);
    } 
    
  function handleAboutChange(evt) {
      setAbout(evt.target.value);
    }

  //После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах
  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  //Обработчик для сохранения данных
  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: about,
    });
  }

  return (
    <PopupWithForm
    name="profile"
    title="Редактировать профиль"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    buttonTitle="Сохранить"
  >
    <div className="popup__field">
      <input
        name="name" id="name" type="text" required
        className="popup__input popup__input_name"
        placeholder="Имя" minLength="2" maxLength="30"
        onChange={handleNameChange}
        value={name || ''}/>
      <span id="name-error" className="popup__error-visible"></span>
    </div>

    <div className="popup__field">
      <input
        name="about" id="about" type="text" required
        className="popup__input popup__input_about"
        placeholder="О себе" minLength="2" maxLength="200"
        onChange={handleAboutChange}
        value={about || ''}/>
      <span id="about-error" className="popup__error-visible">
      </span>
    </div>
  </PopupWithForm>
  )
}

export default EditProfilePopup