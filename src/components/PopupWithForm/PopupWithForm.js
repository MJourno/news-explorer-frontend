import { Link } from 'react-router-dom';

function PopupWithForm(props) {

  function openDifferentPopup() {
    props.onClose();
    props.handleDifferentPopup();

  }

  return(
  <dialog  className={`popup popup_type_${props.name}
  ${props.isOpen ? "popup_is-open" : ""
    }`}>
    <div className={`popup__container popup__container-${props.name}`}>
      <button
        aria-label="Close"
        type="button"
        onClick={props.onClose}
        className={`popup__close popup__close-${props.name}`}
      />
      <form name={`form__${props.name}`}
        className={`popup__form popup__form_type_${props.name}`}>
        <h2 className="popup__title">
          {props.title}
        </h2>
        {props.children}
        <button
          aria-label="save"
          type="submit"
          value="Save"
          onClick={props.onSubmit}
          className="popup__save">
          {props.value}
        </button>
        <p className='popup__redirect-text'>or <Link className='popup__redirect-link' onClick={openDifferentPopup}>{props.switchText}</Link></p>
      </form>
    </div>
  </dialog >
  )
}
export default PopupWithForm;