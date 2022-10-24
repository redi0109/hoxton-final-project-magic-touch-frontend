import { Data } from "../types";
import { Button } from "@mui/material";
import { useState } from "react";

type Props = {
  signIn: (data: Data) => void;
}



export function Register({ signIn, }: Props) {
  const [signUpError, setSignUpError] = useState<null | Array<string>>(null);
  return (
    <div className="form-page">
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          fetch("http://localhost:5000/sign-up", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: e.target.name.value,
              email: e.target.email.value,
              password: e.target.password.value,
            }),
          })
            .then((resp) => resp.json())
            .then((data) => {
              if (data.errors) {
                setSignUpError(data.errors);
              } else {
                signIn(data);
              }
            });
        }}
      >
        <h2 className="form-title">Sign up</h2>
        <label>
          <input
            className="text-input"
            type="name"
            name="name"
            required
            placeholder="Name"
          />
        </label>
        <label>
          <input
            className="text-input"
            type="email"
            name="email"
            required
            placeholder="Email"
          />
        </label>
        <label>
          <input
            className="text-input"
            type="password"
            name="password"
            required
            placeholder="Password"
          />
        </label>
        {signUpError ? <p className="error">{signUpError}</p> : null}

        <Button variant="contained" size="small" type="submit">
          Register
        </Button>
      </form>
    </div>
  );
}
