import { Button } from "@mui/material";
import { Data } from "../types";

type Props = {
  signIn: (data: Data) => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setError: React.Dispatch<React.SetStateAction<string[] | null>>;
  error: string[] | null;
};
export function LogIn({ signIn, setPage, setError, error }: Props) {
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
                setError(data.errors);
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
        {error ? <p className="error">{error}</p> : null}

        <div>
          <Button
            color="inherit"
            size="large"
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
