import imgSuccess from '../image/success.svg';
import imgMistake from '../image/mistake.svg';

function InfoTooltip(props) {
    const popupClass = `popup ${props.isOpen ? "popup_opened" : ""}`;
    const picture = props.isSuccess ? imgSuccess : imgMistake;
    const title = props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.';

    return (
        <div className={popupClass} onClick={props.onClose} >
            <div className="popup__content" onClick={e => { e.stopPropagation() }}>
                <button className="popup__close hover-button" type="button" onClick={props.onClose}></button>
                <div className="popup__info-tooltip">
                    <img className="popup__picture" src={picture} />
                    <h3 className="popup__title">{title}</h3>
                </div>
            </div>
        </div>
    )
}

export default InfoTooltip;

