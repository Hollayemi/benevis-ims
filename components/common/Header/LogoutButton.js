"use client";

import { useAuth } from "@/contexts/authContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const LogoutButton = ({ link }) => {
  const router = useRouter();
  const { logout } = useAuth()

  const signOutHandler = async () => {
    await logout({ redirect: false, callbackUrl: "/superadmin/login" });
    router.push("/");
    toast.success("Logout successful!");
  };


  return (
    <div className="shadow-primary-300 h-[90px] w-full rounded-md bg-white/90 p-5 shadow-md backdrop-blur">
      <div className="flex h-full w-full items-end justify-end gap-5">
        <Link href={link}>
          <button className="rounded bg-secondary px-3 py-1 font-semibold text-white hover:bg-primary">
            Profile
          </button>
        </Link>
        <button
          onClick={signOutHandler}
          className="rounded bg-primary px-3 py-1 font-semibold text-white hover:bg-secondary"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default LogoutButton;
