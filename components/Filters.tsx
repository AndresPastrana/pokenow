"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateCurrentSearchParams } from "@/app/hooks/useUpdateCurrentSearchParams";
import { Suggestions } from "./Suggestions";

const Filter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { updateSearchParams } = useUpdateCurrentSearchParams();

  const [filters, setFilters] = React.useState(() => {
    return {
      base_experience: searchParams.get("base_experience") || "",
      height: searchParams.get("height") || "",
      weight: searchParams.get("weight") || "",
    };
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));

    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    updateSearchParams(params);
  };

  const handleReset = () => {
    setFilters({ base_experience: "", height: "", weight: "" });
    updateSearchParams(new URLSearchParams());
    router.push("?");
  };

  return (
    <div className="flex flex-row gap-3 max-w-">
      <form className=" mt-2 flex flex-col space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg  md:space-y-0 md:space-x-4">
        {["base_experience", "height", "weight"].map((field) => (
          <div className="flex flex-col" key={field}>
            <Label
              htmlFor={field}
              className="mb-2 text-gray-700 dark:text-gray-300 capitalize"
            >
              {field.replace("_", " ")}
            </Label>
            <Input
              id={field}
              name={field}
              type="number"
              placeholder={`e.g. ${field === "base_experience" ? "100" : "10"}`}
              value={filters[field as keyof typeof filters]}
              onChange={handleChange}
            />
          </div>
        ))}

        <Button type="button" variant="ghost" onClick={handleReset}>
          Reset
        </Button>
      </form>
      <Suggestions />
    </div>
  );
};

export default Filter;
