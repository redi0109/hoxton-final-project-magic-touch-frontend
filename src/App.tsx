import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import { AboutUs } from "./Pages/AboutUs";
import { Brands } from "./Pages/Brands";
import { Home } from "./Pages/Home";
import { PageNotFound } from "./Pages/NotFound";
import { Categories } from "./Pages/Categories";
import { Data, User } from "./types";
import { SingleProduct } from "./Pages/SingleProduct";
import { ProfilePage } from "./Pages/ProfilePage";
import { UserPage } from "./Pages/UserPage";
import { Cart } from "./Pages/Cart";

function App() {
  const [currentUser, setCurrentUser] = useState<null | User>(null);
  const [error, setError] = useState<null | Array<string>>(null);
  const refreshPage = () => {
    window.location.reload();
  };
  useEffect(() => {
    if (localStorage.token) {
      fetch("http://localhost:5000/validate", {
        headers: {
          Authorization: localStorage.token,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.errors) {
            setError(data.errors);
          } else {
            signIn(data);
          }
        });
    }
  }, []);
  function signIn(data: Data) {
    setCurrentUser(data.user);
    localStorage.token = data.token;
  }

  function signOut() {
    setCurrentUser(null);
    localStorage.removeItem("token");
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home currentUser={null} />} />
          <Route path="/shop" element={<Categories currentUser={null} />} />
          <Route path="/brands" element={<Brands currentUser={null} />} />
          <Route path="/aboutus" element={<AboutUs currentUser={null} />} />

          <Route
            path="/products/:id"
            element={
              <SingleProduct
                refreshPage={refreshPage}
                setError={setError}
                error={error}
                currentUser={currentUser}
              />
            }
          />

          <Route
            path="/cart"
            element={
              <Cart
                refreshPage={refreshPage}
                currentUser={currentUser}
                setError={setError}
                error={error}
              />
            }
          />

          <Route
            path="/products/:id"
            element={
              <SingleProduct
                refreshPage={refreshPage}
                error={error}
                setError={setError}
                currentUser={currentUser}
              />
            }
          />

          <Route
            path="/cart"
            element={
              <Cart
                refreshPage={refreshPage}
                currentUser={currentUser}
                error={error}
                setError={setError}
              />
            }
          />

          <Route
            path="profile"
            element={
              currentUser ? (
                <ProfilePage currentUser={currentUser} signOut={signOut} />
              ) : (
                <UserPage
                  signIn={signIn}
                  error={error}
                  setError={setError}
                  currentUser={currentUser}
                />
              )
            }
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
