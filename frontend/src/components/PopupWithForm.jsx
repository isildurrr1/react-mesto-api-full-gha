function PopupWithForm(props) {
    return(
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
            <h3 className="popup__title">{props.title}</h3>
            <form action="#" className="popup__form" name={props.name} onSubmit={props.onSubmit} noValidate>
                {props.children}
                <button className="popup__button" type="submit">{props.buttonText}</button>
            </form>
            <button onClick={props.onClose} className="popup__close" type="button"></button>
        </div>
        </div>
    );
}

export default PopupWithForm;