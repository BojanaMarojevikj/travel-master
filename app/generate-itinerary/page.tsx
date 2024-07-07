import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import TravelForm from "./components/TravelForm";

export default function Page() {
    return (
        <>
          <Navbar />
          <div className="px-[20px] lg:container lg:px-20 mx-auto">
            <TravelForm/>
          </div>
          <Footer />
        </>
      );
}