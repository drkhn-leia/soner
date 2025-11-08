"use client";

type DropdownProps = {
  label: string;
  items: { name: string; href?: string }[];
};

export default function Dropdown({ label, items }: DropdownProps) {
  return (
    <div className="relative group py-8">
      <button className="text-gray-700 hover:text-blue-500 cursor-pointer flex items-center gap-1">
        {label}
      </button>

      {/* Menü */}
      <ul
        className="absolute top-full -mt-4 left-0 bg-white border border-gray-200 shadow-lg rounded-md py-2 w-40 
        opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-10"
      >
        {items.map((item) => (
          <li
            key={item.name}
            className="px-4 py-2 cursor-pointer text-gray-700 hover:text-blue-500 whitespace-nowrap"
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
