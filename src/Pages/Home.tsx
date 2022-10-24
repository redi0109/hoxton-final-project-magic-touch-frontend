import { Footer } from "../Components/Footer";
import { Header, } from "../Components/Header";
import { HomeMain } from "../Components/HomeMain";
import { User } from "../types";

export type Props = {
  currentUser: User | null;
};
export function Home({ currentUser }: Props) {
    return (
      <div className="home">
        <Header currentUser={currentUser}/>
        <HomeMain/>
        <Footer/>
      </div>
    );
}