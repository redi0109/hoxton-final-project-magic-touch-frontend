import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { CartItem, User } from "../types";

type Props = {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  refreshPage: () => void;
  error: string[] | null;
  setError: React.Dispatch<React.SetStateAction<string[] | null>>;
  currentUser: User | null;
};

export function FullCart({
  cartItems,
  setCartItems,
  refreshPage,
  error,
  setError,
  currentUser,
}: Props) {
  let total = 0;
  for (let item of cartItems) {
    total += item.quantity * item.product.price;
  }
  if (!currentUser) return <h1>Loading..</h1>;
  return (
    <section className="basket-container">
      <h2> {currentUser.name}'s Cart</h2>
      <ul>
        {cartItems.map((cartItem) => (
          <li key={cartItem.id}>
            <article className="basket-container__item">
              <Link to={`/products/${cartItem.productId}`}>
                <img
                  className="cart-image"
                  src={cartItem.product.image}
                  alt={cartItem.product.productName}
                />
              </Link>
              <div className="product-info">
                <p>{cartItem.product.productName}</p>
                <p>{cartItem.product.brand.name}</p>
                <p>Qty: {cartItem.quantity}</p>
                <p>Price: {cartItem.product.price} €</p>
              </div>

              <Button
                size="small"
                variant="text"
                color="error"
                onClick={() => {
                  fetch(`http://localhost:5000/cartitem/${cartItem.id}`, {
                    method: "DELETE",
                    headers: {
                      Authorization: localStorage.token,
                    },
                  })
                    .then((resp) => resp.json())
                    .then((data) => setCartItems(data));
                  refreshPage();
                }}
              >
                Remove
              </Button>
            </article>
          </li>
        ))}
      </ul>
      <div className="buy">
        <h3>Your total: {total} €</h3>
        <Button
          variant="contained"
          color="success"
          className="btn"
          onClick={() => {
            fetch("http://localhost:5000/buy", {
              method: "POST",
              headers: {
                Authorization: localStorage.token,
              },
              body: JSON.stringify({}),
            })
              .then((rsp) => rsp.json())
              .then((data) => {
                if (data.errors) {
                  setError(data.errors);
                } else {
                  refreshPage();
                }
              });
          }}
        >
          Buy
        </Button>
      </div>
      {error ? <p className="error">{error}</p> : null}
    </section>
  );
}
