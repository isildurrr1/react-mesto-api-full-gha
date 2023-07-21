import React from "react";
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
      <main className="content">
        <section className="profile">
          <div className="profile__cover" >
            <img src={currentUser.avatar} alt="аватар" className="profile__avatar"/>
            <div  onClick={props.onEditAvatar} className="profile__avatar-overlay"></div>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button onClick={props.onEditProfile} className="profile__edit" type="button"></button>
            <p className="profile__job">{currentUser.about}</p>
          </div>
          <button onClick={props.onAddPlace} className="profile__add" type="button"></button>
        </section>
        <section className="elements">
            {props.cards.map((card) => (
                <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} handleCardDelete={props.onCardDelete}/>
            ))}
        </section>
      </main>
    );
  }
  
  export default Main;