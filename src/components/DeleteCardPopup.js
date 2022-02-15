import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup(props) {
    return ( 
    <PopupWithForm
        name='confirm'
        title='Вы уверены?'
        isOpen={props.isOpen}
        onClose={props.onClose}
        buttonText={'Да'} 
        onSubmit={props.onSubmit}/>
     )
}

export default DeleteCardPopup;
