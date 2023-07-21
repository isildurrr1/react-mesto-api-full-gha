import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');
  function changeName(e) {setName(e.target.value)};
  function changeLink(e) {setLink(e.target.value)};
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link
    });
  }

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return(
    <PopupWithForm name='add-card' title='Новое место' buttonText='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input type="text" value={name || ""} onChange={changeName} className="popup__input popup__input_form_place" id="place-input" name="place" placeholder="Название" minLength="2" maxLength="30" required/>
      <span className='popup__error place-input-error'></span>
      <input type="url" value={link || ""} onChange={changeLink} className="popup__input popup__input_form_src" id="src-input" name="src" placeholder="Ссылка на картинку" required/>
      <span className='popup__error src-input-error'></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;