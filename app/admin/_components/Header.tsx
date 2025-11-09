"use client";
import { useRouter } from "next/navigation";
import AdminLogoutButton from "./AdminLogoutButton";

export default function Header({ userEmail }: { userEmail: string }) {
  return (
    <nav className="flex flex-row justify-end items-center bg-blue-400 w-full">
      <a href="/admin/profile" className="block px-3 py-2 hover:bg-blue-300/40">
        {userEmail}
      </a>
      <a className="block px-3 py-2 hover:bg-red-700/40 cursor-pointer">
        <AdminLogoutButton />
      </a>
    </nav>
  );
}
