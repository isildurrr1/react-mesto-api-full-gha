import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  return(
    <PopupWithForm name='change-avatar' title='Обновить аватар' buttonText='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
        <input type="url" className="popup__input popup__input_form_avatar" ref={avatarRef} id="avatar-input" name="src" placeholder="Ссылка на фото" required/>
        <span className='popup__error avatar-input-error'></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;