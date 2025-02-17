"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/url";
import { cn } from "@/lib/utils";

const filters = [
  { name: "React", value: "react" },
  { name: "JavaScript", value: "javascript" },

  // { name: "Newest", value: "newest" },
  // { name: "Popular", value: "popular" },
  // { name: "Unanswered", value: "unanswered" },
  // { name: "Recommended", value: "recommended" },
];

const HomeFilter = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParams = searchParams.get("filter");

  const [filterQuery, setFilterQuery] = useState(filterParams || "");
  const [active, setActive] = useState("");

  const handleTypeClick = (value: string) => {
    let newUrl = "";

    if (value === active) {
      setActive("");

      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["filter"],
      });
    } else {
      setActive(value);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: value,
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="mt-10 hidden flex-wrap gap-3 sm:flex">
      {filters.map((filter) => (
        <Button
          key={filter.name}
          className={cn(
            `body-medium rounded-lg px-6 py-3 capitalize shadow-none`,
            active === filter.value
              ? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400"
              : "bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300"
          )}
          onClick={() => handleTypeClick(filter.value)}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilter;
