function ImagePopup(props) {
    return (
        <div className={`popup popup_image ${(JSON.stringify(props.card) === '{}') ? '' : 'popup_opened'}`}>
            <div className="popup__figure">
                <img src={props.card.link} alt={props.card.name} className="popup__photo"/>
                <h2 className="popup__text">{props.card.name}</h2>
                <button onClick={props.onClose} className="popup__close" type="button"></button>
            </div>
        </div>
    );
}

export default ImagePopup;