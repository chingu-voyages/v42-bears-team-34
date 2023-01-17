import './style.css'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo.jpg'
import MenuIcon from '@mui/icons-material/Menu';

function NavBar() {
    return (
        <>
            <div className="nav-bar">
                <nav>
                    <ul>
                        <img src={Logo} alt="logo" className="logo" />
                        <li><Link to="/" className="links">HOME</Link></li>
                        <li><Link to="blog" className="links">BLOG</Link></li>
                        <li><Link to="contact" className="links">CONTACT</Link></li>
                        <li><Link to="login" className="links">LOGIN</Link></li>
                        <li><Link to="signup" className="links">SIGN UP</Link></li>
                        <div className="menu">
                            <img src={MenuIcon} />
                        </div>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default NavBar