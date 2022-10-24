import Button from "@mui/material/Button/Button";
import { useEffect, useState } from "react";
import { Footer } from "../Components/Footer";
import { Header } from "../Components/Header";
import { ProductCover } from "../Components/ProductCover";
import { Brand, Product, User } from "../types";

type Props = {
  currentUser: User | null;
};
export function Brands({ currentUser }: Props) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [brandProducts, setBrandProducts] = useState<Product[]>([]);
  function getDatafromServer() {
    fetch("http://localhost:5000/brands")
      .then((resp) => resp.json())
      .then((data) => setBrands(data));
  }

  useEffect(() => {
    getDatafromServer();
  }, []);
  return (
    <div className="brands-page">
      <Header currentUser={currentUser} />
      <h1 className="title">SHOP BY BRANDS</h1>
      <div className="brands">
       
        {brands.map((brand) => (
          <div
            className="brand"
            key={brand.id}
            onClick={() => {
              fetch(`http://localhost:5000/productsByBrand/${brand.id}`)
                .then((rsp) => rsp.json())
                .then((data) => setBrandProducts(data));
            }}
          >
            <Button size="small" variant="contained">
              {brand.name}
            </Button>
          </div>
        ))}
      </div>
      <div className="brands-products">
        {brandProducts.map((product) => (
          <ProductCover product={product} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
