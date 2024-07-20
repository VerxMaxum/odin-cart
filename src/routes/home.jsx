import NavBar from '../components/navbar'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <>
            <NavBar />
            <main className="main-home">
                <div className="background">
                    <Link to="shop"><button>Shop Now!</button></Link>
                </div>
            </main>
        </>
    );
}

export default Home;