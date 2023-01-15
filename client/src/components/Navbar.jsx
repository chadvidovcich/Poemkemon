import { useState } from 'react';
import PropTypes from 'prop-types';
import { GiHamburgerMenu } from 'react-icons/gi';

const Navbar = ({ title }) => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <nav className="navigation">
      <a href="/" className="brand-name">
        <h1>{title}</h1>
      </a>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}>
        <GiHamburgerMenu size={18} />
      </button>
      <div
        className={
          isNavExpanded ? 'navigation-menu expanded' : 'navigation-menu'
        }>
        <ul>
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/issues">All Open Issues</a>
          </li>
          <li>
            <a href="/auth/logout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

Navbar.defaultProps = {
  title: 'Bug Eye',
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Navbar;
