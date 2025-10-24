"use client";

import { useEffect } from "react";
import { Search } from "lucide-react";

interface SearchBoxProps {
  condominios: Record<string, any>[];
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setFiltered: React.Dispatch<React.SetStateAction<Record<string, any>[]>>;
  placeholder: string;
}

export default function SearchBox({
  condominios,
  search,
  setSearch,
  setFiltered,
  placeholder
}: SearchBoxProps) {
  useEffect(() => {
    const filtered = (condominios || []).filter((c) => {
      const values = Object.values(c)
        .map((v) => String(v).toLowerCase())
        .join(" ");
      return values.includes(search.toLowerCase());
    });
    setFiltered(filtered);
  }, [search, condominios, setFiltered]);

  return (
    <div className="relative w-full max-w-md mb-6">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black" />
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-10 pr-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-white"
      />
    </div>
  );
}
