import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup (props) {
    const [title, setTitle] = React.useState('');
    const [link, setLink] = React.useState('');

    React.useEffect(() => {
        setTitle('')
        setLink('')
    }, [props.isOpen]);

    //const [errorTitle, setErrorTitle] = React.useState('');
    //const [errorLink, setErrorLink] = React.useState('.');

    function handleChangeTitle(e) {
        setTitle(e.target.value)
        //if(e.target.value.length < 3 || e.target.value.length > 40) {
        //  setErrorTitle('Минимальное количество символов: 3.Максимально количество символов: 40.')   
        //} else {
        //  setErrorTitle('')
        //}
    }

    function handleChangeLink(e) {
        setLink(e.target.value)
        //if (???) {
        //  setErrorLink('Введите адрес сайта')
        //} else {
        //  setErrorLink('')
        //}
    }

    function handleSubmit(e) {
        e.preventDefault();       
        props.onAddPlace({
            title: title,
            link: link,            
        });
    }

    return (
        <PopupWithForm 
        name='add' 
        title='Новое место' 
        isOpen={props.isOpen} 
        onClose={props.onClose}
        buttonText={'Создать'}
        onSubmit={handleSubmit} 
        isLoadingData={props.isLoadingData} >        
          <input
            id="title-input"
            className="popup__input popup__input_info_title"
            type="text"
            name="title"
            placeholder="Название"
            required 
            minLength="3"
            maxLength="30" 
            value={title || ''}
            onChange={handleChangeTitle} />
            <span id="title-input-error" className="popup__error"></span>
          {/*(title && errorTitle) && <span id="title-input-error" className="popup__error">{errorTitle}</span>*/}

          <input
            id="link-input"
            className="popup__input popup__input_info_link"
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            required 
            value={link || ''}
            onChange={handleChangeLink}/>
            <span id="link-input-error" className="popup__error"></span>
           {/*(link && errorLink) && <span id="link-input-error" className="popup__error">{errorLink}</span>*/}
      </PopupWithForm>
    )
}

export default AddPlacePopup;
