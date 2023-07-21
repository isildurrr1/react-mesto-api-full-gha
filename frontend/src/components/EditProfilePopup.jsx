import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  function changeName(e) {setName(e.target.value)};
  function changeDescription(e) {setDescription(e.target.value)};
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm name='edit-profile' title='Редактировать профиль' buttonText='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input type="text" value={name || ""} onChange={changeName} className="popup__input popup__input_form_name" id="name-input" name="name" placeholder="Имя" minLength="2" maxLength="40" required/>
      <span className='popup__error name-input-error'></span>
      <input type="text" value={description || ""} onChange={changeDescription} className="popup__input popup__input_form_job" id="job-input" name="job" placeholder="Вид деятельности" minLength="2" maxLength="200" required/>
      <span className='popup__error job-input-error'></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;