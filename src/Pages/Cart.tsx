import { CartItem, User } from "../types";
import { useEffect, useState } from "react";
import { EmptyCart } from "../Components/EmptyCart";
import { FullCart } from "../Components/FullCart";
import { Header } from "../Components/Header";
type Props = {
  currentUser: null | User;
  error: null | string[];
  setError: React.Dispatch<React.SetStateAction<string[] | null>>;
  refreshPage: () => void
};
export function Cart({ currentUser, error, setError, refreshPage}: Props) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/cartitems", {
      headers: {
        Authorization: localStorage.token,
      },
    })
      .then((rsp) => rsp.json())
      .then((data) => setCartItems(data));
  }, []);
  if (cartItems.length === 0)
    return (
      <>
        <Header currentUser={currentUser} />
        <EmptyCart currentUser={currentUser} />
      </>
    );

  
  return (
    <>
      <Header currentUser={currentUser} />
      <FullCart
        currentUser={currentUser}
        setError={setError}
        cartItems={cartItems}
        refreshPage={refreshPage}
        setCartItems={setCartItems}
        error={error}
      />
    </>
  );
}
