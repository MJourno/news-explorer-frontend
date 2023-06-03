import { Link } from 'react-router-dom';

function RegSuccessPopup(props) {
  const info = 'Registration successfully completed!';

  function openDifferentPopup() {
    console.log('openDifferentPopup2');
    props.onClose();
    props.handleDifferentPopup();
  }

  return (
    <div className={`popup popup_type_${props.name}
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
          <h2 className="popup__reg-title">
            {info}
          </h2>
          <p><Link className='popup__reg-link' onClick={openDifferentPopup}>Sign in</Link></p>
        </form>
      </div>
    </div>
  )
}

export default RegSuccessPopup;