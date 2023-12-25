import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import './Header.scss'
import { Link ,NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { handleActionLogout } from '../../redux/actions/accountAction'

function Header() {
  const userInfo = useSelector(state => state.account.userInfo);
  const dispatch = useDispatch();

  const handleLogin = () => {
    const url = `${process.env.REACT_APP_BACKEND_SSO_LOGIN}?redirectUrl=${process.env.REACT_APP_SERVICE_URL}`
    window.location.href = url
  }

  const handleLogout = () => {
    dispatch(handleActionLogout());
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">FrontEnd SSO</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Left nav */}
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/news" className="nav-link">News</NavLink>
            <NavLink to="/contact" className="nav-link">Contact</NavLink>
            <NavLink to="/about" className="nav-link">About</NavLink>
          </Nav>

          {/* Right Nav */}
          { userInfo && userInfo.access_token && userInfo.refresh_token &&
            <Nav>
              <Nav.Link href="#">Welcome {userInfo.email} </Nav.Link>
            </Nav>
          }
          <Nav>
            <NavDropdown NavDropdown title="Settings" id="basic-nav-dropdown">
              {userInfo && userInfo.access_token && userInfo.refresh_token ?
               ( <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item> ) :
               ( <NavDropdown.Item onClick={() => handleLogin()}>Login</NavDropdown.Item> )
              }
             
            </NavDropdown> 
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header