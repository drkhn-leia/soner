"use client";
export default function LogoutButton() {
  return (
    <div
      onClick={async () => {
        await fetch("/api/logout", { method: "POST" });
        window.location.href = "/login";
      }}
      className="text-sm opacity-80 hover:opacity-100"
    >
      Çıkış
    </div>
  );
}
