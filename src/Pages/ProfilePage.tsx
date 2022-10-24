
import { User } from "../types";
import { ProfileInfo } from "../Components/ProfileInfo";
import { BoughtProducts } from "../Components/BoughtProducts";
import { Header } from "../Components/Header";

type Props = {
  currentUser: User | null;
  signOut: () => void;
};
export function ProfilePage({ currentUser, signOut }: Props) {
 
  return (
    <>
      <Header currentUser={currentUser} />
      <div className="profile-page">
        <ProfileInfo currentUser={currentUser} signOut={signOut} />
        <BoughtProducts currentUser={currentUser} />
      </div>
    </>
  );
}
