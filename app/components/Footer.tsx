import Image from "next/image";
import Logo from "../../public/assets/full-logo.png";
import Facebook from "../../public/assets/Facebook.svg";
import Twitter from "../../public/assets/X.svg";
import Feed from "../../public/assets/Feed.svg";

export function Footer() {
  return (
    <div className="bg-blue-100">
      <div className="pt-[40px] pb-[40px] bg-blue-100">
        <div className="flex items-center justify-center gap-x-[12px]">
          <Image src={Logo} alt="Logo" className="h-[3vh] w-auto"/>
        </div>

        <p className="pt-[56px] text-center text-[14px] font-medium text-[#5F7896] sm:pt-5">
          © Copyright 2024. Bojana Marojevikj. All rights reserved.
        </p>

        <div className="flex items-center justify-center gap-x-[56px] pt-[40px]">
          <Image src={Facebook} alt="Facebook" />
          <Image src={Feed} alt="Feed" />
          <Image src={Twitter} alt="Twitter" />
        </div>
      </div>
    </div>

  );
}
