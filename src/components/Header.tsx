import Image from "next/image";
import Link from "next/link";
import logo from "../assets/logo.png";
import HeaderActionsContainer from "./HeaderActionsContainer";
const Header = () => {
  return (
    <header className="align-center flex w-full justify-between border-b border-b-[#e6ebf4] bg-white px-4 py-4 sm:px-8">
      <Link href={"/"}>
        <Image src={logo} alt="OpenAI" className="w-36 object-contain" />
      </Link>
      <HeaderActionsContainer />
    </header>
  );
};
export default Header;
