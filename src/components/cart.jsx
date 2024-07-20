const Cart = ({ items }) => {
    return (
        <>
            <h1>Cart</h1>
            <div className="cart-content">
                {items}
            </div>
        </>
    );
}

export default Cart;