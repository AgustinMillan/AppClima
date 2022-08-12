import { Link } from 'react-router-dom';
import Logo from "../logoHenry.png";
import SearchBar from "./SearchBar.jsx"
import "./Nav.css";

function Nav({onSearch}) {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <Link to='/'>
        <span className="navbar-brand">
          <img id="logoHenry" src={Logo} width="30" height="30" className="d-inline-block align-top" alt="" />
          CLIMA APP
        </span>
      </Link>
      <Link to='/about' id='linkabout'>
        <span>About</span>
      </Link>
        <SearchBar
          onSearch={onSearch}
        />
    </nav>
  );
};

export default Nav;