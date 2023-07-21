import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;

    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = ( 
        `element__like ${isLiked && 'element__like_active'}`
      );

    function handleClick() {
        props.onCardClick(props.card);
    }

    function deleteCard() {
        props.handleCardDelete(props.card)
    }

    function like() {
        props.onCardLike(props.card);
    }
    return (
        <article className="element">
            {isOwn && <button onClick={deleteCard} className="element__trash" type="button"/>}
            <div onClick={handleClick} className="element__img-container">
                <img src={props.card.link} alt={props.card.name} className="element__image"/>
            </div>
            <div className="element__sign">
                <h2 className="element__name">{props.card.name}</h2>
                <div className="element__like-container">
                <button onClick={like} className={cardLikeButtonClassName} type="button"></button>
                <span className="element__like-count">{props.card.likes.length}</span>
                </div>
            </div>
        </article>
)};

export default Card;