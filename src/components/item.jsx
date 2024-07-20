import PropTypes from 'prop-types'

const Item = ({ id, productName, src, quantity, price, isRemove }) => {
    return (
        <div className="item" id={"item" + id}>
            <img className="product-img" src={src}/>
            <div className="item-details">
                <h1>{productName}</h1>
                <div className="add-more">
                    <button>-</button>
                    <p>{quantity}</p>
                    <button>+</button>
                </div>
                <div className="price-add">
                    <h2>{price}</h2>
                    {isRemove ?
                        <button>Remove</button>
                        :
                        <button>Add to Cart</button>
                    }
                </div>
            </div>
        </div>
    );
}

Item.propTypes = {
    id: PropTypes.number,
    productName: PropTypes.string,
    src: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
    isRemove: PropTypes.bool
}

export default Item;