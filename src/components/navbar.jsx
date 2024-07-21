import { Link } from "react-router-dom"
import PropTypes from 'prop-types'

const NavBar = ({ onClick }) => {
    return (
        <header>
            <div className="header-container">
                <Link to="/"><button>Home</button></Link>

                <button className="cart" onClick={onClick}>
                    <img src="/shopping_cart_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg" />
                </button>
            </div>
        </header>
    );
}

NavBar.propTypes = {
    onClick: PropTypes.func
}

export default NavBar;