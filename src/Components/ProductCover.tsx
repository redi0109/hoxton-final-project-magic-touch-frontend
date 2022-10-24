import { Link } from "react-router-dom";
import {Product} from '../types'
type Props = {
  product: Product;
};

export function ProductCover({ product }: Props) {
  return (
    <Link to={`/products/${product.id}`} key={product.id}>
      <div className="singleProduct" key={product.id}>
        <div className="product">
        <img className="product-img" src={product.image}/>
        <h3 className="product-name">{`${product.productName.slice(0,20)}`}</h3>
        </div>
      </div>
    </Link>
  );
}
