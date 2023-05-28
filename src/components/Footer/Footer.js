import githubImg from '../../images/github.svg';
import facebookImg from '../../images/facebook.svg';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        © 2023 Supersite, Powered by News API
      </p>
      <div className="footer__container">
        <ul className="footer__links">
          <li className="footer__link">
          Home
          </li>
          <li className="footer__link">
          Practicum by Yandex
          </li>
          </ul>
          <ul className='footer__icons'>
          <li>
            <a href="https://github.com/MJourno" target="_blank" rel="noreferrer">
              <img src={githubImg} alt='github' className='footer__icon'/>
            </a>
          </li>
          <li>
            <a href='https://www.facebook.com/' target="_blank" rel="noreferrer">
              <img src={facebookImg} alt='facebook' className='footer__icon'/>
            </a>
          </li>
          </ul>
        
      </div>
    </footer>
  );
}
export default Footer;