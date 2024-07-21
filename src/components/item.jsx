import PropTypes from 'prop-types'

const Item = ({ id, productName, src, quantity, price, modifyQuantity, addToCart,
    removeFromCart, isRemove

 }) => {
    return (
        <div className="item" id={id}>
            <img className="product-img" src={src}/>
            <div className="item-details">
                <h1>{productName}</h1>
                <div id={id} className="add-more">
                    <button className="subtract" onClick={modifyQuantity}>-</button>
                    <div className="quantity-container">
                        <p>{quantity}</p>
                    </div>
                    <button className="add" onClick={modifyQuantity}>+</button>  
                </div>
            </div>
            <div className="price-add">
                <h2>${price}</h2>
                {isRemove ?
                    <button onClick={removeFromCart}>Remove</button>
                    :
                    <button onClick={addToCart}>Add to Cart</button>
                }
            </div>
        </div>
    );
}

Item.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    productName: PropTypes.string,
    src: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
    modifyQuantity: PropTypes.func,
    addToCart: PropTypes.func,
    removeFromCart: PropTypes.func,
    isRemove: PropTypes.bool
}

export default Item;