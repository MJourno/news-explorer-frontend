import { Link } from 'react-router-dom';
import githubImg from '../../images/github.svg';
import facebookImg from '../../images/facebook.svg';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        © 2023 Supersite, Powered by News API
      </p>
      <nav className="footer__container">
        <ul className="footer__links">
          <li className='footer__link-item'>
            <Link className='footer__link' to='/'>
              Home
            </Link>
          </li>
          <li className='footer__link-item'>
            <a className="footer__link" href='https://www.practicum100.org/' target='_blank' rel="noreferrer">
              Practicum
            </a>
          </li>
        </ul>
        <ul className='footer__icons'>
          <li>
            <a className='footer__icon' href="https://github.com/MJourno" target="_blank" rel="noreferrer">
              <img src={githubImg} alt='github'/>
            </a>
          </li>
          <li>
            <a className='footer__icon' href='https://www.facebook.com/' target="_blank" rel="noreferrer">
              <img src={facebookImg} alt='facebook'/>
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
export default Footer;