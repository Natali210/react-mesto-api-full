import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from "react";

const EditAvatarPopup = props => {
  const { isOpen, onClose, onUpdateAvatar } = props;
  //записываем объект, возвращаемый хуком, в переменную
  const avatarRef = useRef();

  //Обработчик для сохранения данных
  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    // Передаём значение, полученное с помощью рефа, во внешний обработчик
    onUpdateAvatar({ 
      avatar: avatarRef.current.value 
    });
  }

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);
  
  return (
    <PopupWithForm
      name="newAvatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonTitle="Сохранить"
      >
      <div className="popup__field">
        <input
          name="avatar" id="avatar" type="url" required
          className="popup__input popup__input_avatar"
          placeholder="Ссылка на аватар"
          ref={avatarRef} />
          <span id="avatar-error" className="popup__error-visible"></span>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;