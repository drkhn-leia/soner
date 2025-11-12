"use client";

export default function Header({ userEmail }: { userEmail: string }) {
  return (
    <nav className="flex flex-row justify-end items-center bg-blue-400 w-full">
      <span className="text-sm text-gray-600">{userEmail}</span>
      <a
        className="text-sm text-blue-600 hover:underline"
        href="/admin/logout"
      >
        Logout
      </a>
    </nav>
  );
}
