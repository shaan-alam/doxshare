import Link from "next/link";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import styles from "../../styles/homepage.module.scss";
import clsx from "clsx";

const Navbar = () => {
  const { data } = useSession();

  return (
    <nav
      className={clsx(
        "sticky top-0 z-[10] border-b border-[#353535] bg-gray-800 bg-opacity-10 bg-clip-padding p-4 backdrop-blur-[10px] backdrop-filter",
        styles.nav,
      )}
    >
      <div className="container flex items-center">
        <Link href="/">
          <div className="logo flex items-center">
            <img
              src="./dx-logo.svg"
              alt="Doxshare"
              className="mr-2 h-10 w-10"
            />
            <h1 className="text-xl font-bold tracking-tighter">doxshare</h1>
          </div>
        </Link>
        <div className="sign-in ml-auto">
          {data?.user ? (
            <Link href="/app">
              <Button variant="default">Open App</Button>
            </Link>
          ) : (
            <Link href="/auth">
              <Button variant="outline">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
