import Button from "@mui/material/Button/Button";
import { useEffect, useState } from "react";
import { Footer } from "../Components/Footer";
import { Header, } from "../Components/Header";
import { ProductCover } from "../Components/ProductCover";
import { Brand, Category, Product, User } from "../types";
type Props = {
  currentUser: User | null;
};
export function Categories({ currentUser }: Props) {

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  
  function getDatafromServer() {
    fetch("http://localhost:5000/categories")
      .then((resp) => resp.json())
      .then((data) => setCategories(data));
  }

  useEffect(() => {
    getDatafromServer();
  }, []);

    return (
      <div className="shop-page">
        <Header currentUser={currentUser}/>
        <h1 className="title">SHOP BY CATEGORIES</h1>
      <div className="shop">
        
        {categories.map((category) => (
           <div
           className="category"
           key={category.id}
           onClick={() => {
             fetch(`http://localhost:5000/productByCategory/${category.id}`)
               .then((rsp) => rsp.json())
               .then((data) => setCategoryProducts(data));
           }}
         >
           <Button size="medium" variant="contained" >
             {category.name}
           </Button>
         </div>
        ))}
      </div>
      <div className="categories-products">
        {categoryProducts.map((product) => (
          <ProductCover product={product} />
        ))}
      </div>
        <Footer/>
       
      </div>
    );
}
