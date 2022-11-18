import React from "react";
import success from "../images/auth-success.png";
import unsuccess from "../images/auth-error.png";

const InfoTooltip = props => { 
  const { isConfirmed, isOpen, onClose, successInfo, unsuccessInfo } = props; 
  
  return (
    <div className={`popup popup_register ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button className="popup__close" aria-label="Закрыть" type="button" onClick={onClose} />
        {isConfirmed && (
          <div className="popup__register-info">
            <img className="popup__register-image" src={success} alt="Успешная регистрация" />
            <p className="popup__message">{successInfo}</p>
          </div> 
        )}
        {!isConfirmed && (
          <div className="popup__register-info">
            <img className="popup__register-image" src={unsuccess} alt="Ошибка регистрации" />
            <p className="popup__message">{unsuccessInfo}</p>
          </div> 
        )}
      </div>
    </div>
  );
};

export default InfoTooltip;