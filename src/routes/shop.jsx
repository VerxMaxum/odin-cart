import { useState, useEffect } from 'react'
import NavBar from '../components/navbar'
import Item from '../components/item'
import { v4 as uuidv4 } from 'uuid';

const Shop = () => {

    const [isLoading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [cart, setCart] = useState([]);
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
                setItems(json.map((item) => {
                return {
                    key: item.id,
                    id: item.id,
                    productName: item.title,
                    src: item.image,
                    quantity: 0,
                    price: item.price,
                    isRemove: false,
                    onClick: modifyQuantity
                }
                }))
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
                <h1 className="loading">Loading...</h1>
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

    function modifyQuantity(e) {
        const source = e.target;
        const id = source.parentElement.id;
        if(source.textContent == "-") {
            setItems(items.map((item) => {
                if(item.id == id && item.quantity != 0) {
                    return {...item, quantity: item.quantity - 1};
                } else {
                    return item;
                }
            }))
        } else if(source.textContent == "+") {
            setItems(items.map((item) => {
                if(item.id == id) {
                    return {...item, quantity: item.quantity + 1};
                } else {
                    return item;
                }
            }));
        }
    }

    function openSidebar() {
        const sidebar = document.querySelector(".side-cart");
        sidebar.classList.toggle("show");
    }

    function addToCart(e) {
        const source = e.target;
        const id = source.parentElement.parentElement.id;
        const toAdd = items.filter((item) => {
            return item.id == id && item.quantity !== 0;
        })[0];
        toAdd.isRemove = true;
        toAdd.price = toAdd.price * toAdd.quantity;
        toAdd.id = uuidv4();
        setCart([...cart, toAdd])
    }

    function removeFromCart(e) {
        const source = e.target;
        const id = source.parentElement.parentElement.id;
        setCart(cart.filter((item) => {
            return item.id != id;
        }));
    }

    function modifyQuantityCart(e) {
        const source = e.target;
        const id = source.parentElement.id;
        if(source.textContent == "-") {
            setCart(cart.map((item) => {
                if(item.id == id && item.quantity != 0) {
                    return {...item,
                        quantity: item.quantity - 1,
                        price: (item.price / item.quantity) * (item.quantity - 1)
                    };
                } else {
                    return item;
                }
            }))
        } else if(source.textContent == "+") {
            setCart(cart.map((item) => {
                if(item.id == id) {
                    return {...item,
                        quantity: item.quantity + 1,
                        price: (item.price / item.quantity) * (item.quantity + 1)
                    };
                } else {
                    return item;
                }
            }));
        }
    }

    return (
        <>
            <NavBar onClick={openSidebar}/>
            <main className="main-shop">
                {items.map(item => 
                    <Item 
                        key={item.id}
                        id={item.id}
                        productName={item.title}
                        src={item.src}
                        quantity={item.quantity}
                        price={item.price}
                        isRemove={false}
                        modifyQuantity={modifyQuantity}
                        addToCart={addToCart}
                    />
                )}
            </main>
            <div className="side-cart">
                <h1>Your Cart</h1>
                <div className="cart-content">
                    {cart.map(item => 
                    <Item 
                        key={item.id}
                        id={item.id}
                        productName={item.title}
                        src={item.src}
                        quantity={item.quantity}
                        price={item.price}
                        isRemove={true}
                        modifyQuantity={modifyQuantityCart}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                    />
                    )}
                </div>
            </div>
        </>
    );
    
}

export default Shop;