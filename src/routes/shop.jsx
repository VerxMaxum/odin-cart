import { useState, useEffect } from 'react'
import NavBar from '../components/navbar'
import Item from '../components/item'

const Shop = () => {

    const [isLoading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);

    // fetch some data

    useEffect(() => {
        fetch('https://fakestoreapi.com/products', {mode: "cors"})
            .then((response) => {
                if(response.status >= 400) {
                    throw new Error("Server Error");
                }
                return response.json();
            })
            .then((json) => {
                setItems(json.map(item => 
                        <Item
                            key={item.id}
                            id={item.id}
                            productName={item.title}
                            src={item.image}
                            quantity={0}
                            price={item.price}
                            isRemove={false}
                        />
                ));
            })
            .catch((err) => {
                setError(err)
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])

    if(isLoading) {
        return (
            <>
                <NavBar />
                <h1>Loading...</h1>
            </>
        );
    } else if(error) {
        return (
            <>
                <NavBar />
                <h1>Error Occurred</h1>
            </>
        );
    }

    console.log(items);

    return (
        <>
            <NavBar />
            <main className="main-shop">
                {items}
            </main>
        </>
    );
    
}

export default Shop;