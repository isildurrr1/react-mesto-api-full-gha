import yes_icon from '../images/yes_icon.svg'
import no_icon from '../images/no_icon.svg'

const InfoTooltip = ({status, isOpen, onClose}) => {
  return(
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <div className="popup__info">
          <img className='popup__info-icon' src={`${status ? yes_icon : no_icon}`} alt="icon" />
          <h3 className="popup__info-title">
            {status ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
          </h3>
        </div>
        <button onClick={onClose} className="popup__close" type="button"></button>
      </div>
    </div>
  );
}

export default InfoTooltip;