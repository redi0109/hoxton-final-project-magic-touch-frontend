import { Link } from "react-router-dom";
import { User } from "../types";

type Props = {
  currentUser: User | null;
};
export function BoughtProducts({ currentUser }: Props) {
  if (currentUser === null) return <h1>Loading</h1>;
  return (
    <div className="products">
      <h3 className="bought-products__name">Bought products:</h3>

      <div className="bought-products">
        {currentUser.boughtProducts.map((boughtProduct) => (
          <Link to={`/products/${boughtProduct.productId}`}>
            <div className="bought-product__card" key={boughtProduct.id}>
              <img
                className="bought-product__image"
                src={boughtProduct.product.image}
                alt=""
              />
              <h4 className="bought-product__name">{boughtProduct.product.productName}</h4>
              <span className="bought-product__brand">
                {boughtProduct.product.brand.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
