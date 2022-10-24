import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Footer } from "../Components/Footer";
import { Header } from "../Components/Header";
import { CartItem, Product, User } from "../types";


type Props = {
  setError: React.Dispatch<React.SetStateAction<string[] | null>>;
  error: string[] | null;
  currentUser: User | null;
  refreshPage : () => void
};
export function SingleProduct ({ setError, error, currentUser, refreshPage}: Props){

  const [singleProduct, setSingleProduct] = useState<null | Product>(null);
  const params = useParams();
  const [cartItem, setCartItem] = useState<CartItem | null>(null);
  const [quantity, setQuantity] = useState<Number>(1);
  useEffect(() => {
    fetch(`http://localhost:5000/products/${params.id}`)
      .then((resp) => resp.json())
      .then((singleProductFromServer) => setSingleProduct(singleProductFromServer));
  }, []);

  
  if (singleProduct === null) return <h1>Loading</h1>;
  let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return(
    <div className="singlProduct">
      <Header currentUser={currentUser}/>
      <div className="singleProduct">
        <section className="singleProduct__details">
          <img
            className="singleProduct__image"
            src={singleProduct.image}
            alt={singleProduct.productName}
          />
          <div className="singleProduct-detail__side">
            <h2 className="singleProduct__name">{singleProduct.productName}</h2>
            <h3 className="singleProduct__brand">
              {singleProduct.brand.name}
            </h3>
            <h4>Description</h4>
            <p className="singleProduct-description">{`${singleProduct.description.slice(
              0,
              450
            )}...`}</p>
            <h5 className="in-stock">In stock : {singleProduct.inStock}</h5>
            <h5 className="price">Price: {singleProduct.price}€</h5>
            <label htmlFor="quantity">
              Chose quantity:
              <select
                name="quantity"
                onChange={(e) => {
                  setQuantity(Number(e.target.value));
                  console.log(quantity);
                }}
              >
                {numbers.map((number) => (
                  <option value={number} key={number}>
                    {number}
                  </option>
                ))}
              </select>
            </label>
            <Link to={(!currentUser) ? "/profile" : `products/${singleProduct.id}`}>
              <Button
                color="secondary"
                variant="contained"
                size="small"
                className="add-to-cart-btn"
                onClick={() => {
                  const token = sessionStorage.getItem('token');
                  fetch(`http://localhost:5000/cartItem`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: localStorage.token,
                    },
                    body: JSON.stringify({
                    productId: singleProduct.id,
                      quantity: quantity,
                    }),
                  })
                    .then((resp) => resp.json())
                    .then((data) => {
                      if (data.errors) {
                        setError(data.errors);
                      } else {
                        setCartItem(data);
                        refreshPage()
                      }
                    });
                }}
              >
                Add to cart
              </Button>
            </Link>
            {error ? <p className="error">{error} </p> : null}
          </div>
        </section>
      </div>
      <Footer/>
    </div>
  )
}

