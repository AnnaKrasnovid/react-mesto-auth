function PopupWithForm (props) {  
  const popupClass = `popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`;
  const isLoadingData = (props.isLoadingData ? 'Сохранение...' : props.buttonText);
 
  return (    
    <div className={popupClass} onClick={props.onClose} >
      <div className="popup__content" onClick={e=> {e.stopPropagation()}}>
        <button className="popup__close hover-button" type="button" onClick={props.onClose}></button>
        <h3 className="popup__title">{props.title}</h3>
        <form className="popup__form" name={`form-${props.name}`} onSubmit={props.onSubmit} >
         {props.children}
          <button className="popup__button" type="submit">{isLoadingData}</button>        
        </form>
      </div>
    </div>    
  )
}

export default PopupWithForm;

