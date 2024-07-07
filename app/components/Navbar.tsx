import Image from "next/image";
import Logo from "../../public/assets/Logo.svg";
import User from "../../public/assets/User.svg";
import Menu from "../../public/assets/Menu.svg";
import Link from "next/link";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Generate Itinerary", path: "/generate-itinerary"}
];

export function Navbar() {
  return (
    <div className="flex bg-blue-100 justify-center items-center">
      <nav className="flex w-full items-center justify-between px-[20px] py-[16px] lg:container lg:px-20 bg-blue-100">
        <div className="flex items-center">
          <Image src={Logo} alt="Logo" />

          <div className="hidden lg:flex pl-[74px] gap-x-[56px]">
            {navLinks.map((item, index) => (
              <Link href={item.path} key={index}>
                {item.name}
            </Link>
            ))}
          </div>
        </div>

        <div className="flex gap-x-5">
        <p className="hidden lg:block font-medium text-[#36485C] pr-[56px]">
          Register
        </p>

        <div className="flex items-center gap-x-2">
          <Image src={User} alt="User Profile" />
          <span className="hidden font-medium text-[#36485C] lg:block">
            Sign in
          </span>
        </div>

        <Image src={Menu} alt="Menu Button" className="lg:hidden" />
      </div>
      </nav>
    </div>

  );
}
