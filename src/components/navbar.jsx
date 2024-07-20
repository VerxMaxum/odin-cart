import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <header>
            <div className="header-container">
                <Link to="/"><button>Home</button></Link>
            </div>
        </header>
    );
}

export default NavBar;