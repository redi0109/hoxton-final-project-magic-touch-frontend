import { Button } from "@mui/material";
import { User } from "../types";
type Props = {
  currentUser: User | null;
  signOut: () => void;
};

export function ProfileInfo({ currentUser, signOut }: Props) {
  if (currentUser === null) return <h1>Loading</h1>;

  return (
    <div className="profile-info">
      <div className="info">
        <div className="user-info">
          <h2 className="user-name">Name:</h2>
          <span>{currentUser.name}</span>
        </div>
        <div className="user-info">
          <h2 className="user-email">Email:</h2>
          <span>{currentUser.email}</span>
        </div>
        <div className="user-info">
          <h2 className="user-balance">Current balance:</h2>
          <span>{currentUser.balance} €</span>
        </div>
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            signOut();
          }}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
}
