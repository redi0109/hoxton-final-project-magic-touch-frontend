import { AboutUsMain } from "../Components/AboutUsMain";
import { Footer } from "../Components/Footer";
import { Header, } from "../Components/Header";
import { User } from "../types";

export type Props = {
  currentUser: User | null;
};

export function AboutUs({ currentUser }: Props) {
    return (
      <div className="home">
        <Header currentUser={currentUser}/>
        <AboutUsMain/>
        <Footer/>
       
      </div>
    );
}