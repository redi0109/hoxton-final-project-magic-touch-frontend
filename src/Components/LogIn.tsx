import { Button } from "@mui/material";
import { useState } from "react";
import { Data } from "../types";

type Props = {
  signIn: (data: Data) => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};
export function LogIn({ signIn, setPage }: Props) {
  const [signInError, setSignInError] = useState <null | Array<string>>(null);
  return (
    <div className="form-page">
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          fetch("http://localhost:5000/sign-in", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: e.target.email.value,
              password: e.target.password.value,
            }),
          })
            .then((rsp) => rsp.json())
            .then((data) => {
              if (data.errors) {
                setSignInError(data.errors);
              } else {
                signIn(data);
              }
            });
        }}
      >
        <h2 className="form-title">Login Form</h2>
        <label>
          <input
            className="text-input"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
        </label>
        <label>
          <input
            className="text-input"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </label>
        <Button variant="contained" size="small" type="submit">
          Login
        </Button>
        {signInError ? <p className="error">{signInError}</p> : null}

        <div>
          <Button
          
            color="primary"
            size="small"
            onClick={() => {
              setPage(1);
            }}
          >
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
}
