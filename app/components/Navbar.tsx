import Image from "next/image";
import Logo from "../../public/assets/logo.png";
import User from "../../public/assets/User.svg";
import Menu from "../../public/assets/Menu.svg";
import Link from "next/link";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Generate Itinerary", path: "/generate-itinerary" }
];

export function Navbar() {
  return (
    <div className="flex bg-blue-100 justify-center items-center">
      <nav className="flex w-full items-center justify-between px-[20px] py-[16px] lg:container lg:px-20 bg-blue-100">
        <div className="flex items-center">
          <Image src={Logo} alt="Logo" className="h-[4vh] w-auto" />
          <div className="hidden lg:flex pl-[56px] gap-x-[56px]">
            {navLinks.map((item, index) => (
              <Link href={item.path} key={index} className="text-[#36485C] font-medium hover:text-blue-500">
                <p className="hover:shadow-none hover:border-b-5 hover:border-blue-500 hover:font-semibold">
                  {item.name}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex gap-x-5">
          <Link href="/register" className="hidden lg:block font-medium text-[#36485C] pr-[56px] hover:text-blue-500">
            <p className="hover:shadow-none hover:border-b-5 hover:border-blue-500 hover:font-semibold">Register</p>
          </Link>

          <div className="flex items-center gap-x-2">
            <Image src={User} alt="User Profile" />
            <Link href="/sign-in" className="hidden font-medium text-[#36485C] lg:block hover:text-blue-500">
            <p className="hover:shadow-none hover:border-b-5 hover:border-blue-500 hover:font-semibold">Sign In</p>
            </Link>
          </div>

          <Image src={Menu} alt="Menu Button" className="lg:hidden" />
        </div>
      </nav>
    </div>

  );
}
