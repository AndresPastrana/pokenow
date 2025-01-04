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
    <div className="flex flex-col md:flex-row gap-4 max-w-full">
      <form className="w-full md:w-[40%] flex flex-col space-y-3 p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm">
        {["base_experience", "height", "weight"].map((field) => (
          <div className="flex flex-col" key={field}>
            <Label
              htmlFor={field}
              className="mb-1 text-xs font-medium text-gray-700 dark:text-gray-300 capitalize"
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
              className="p-1 border rounded border-gray-300 dark:border-gray-600 text-sm focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
            />
          </div>
        ))}

        <Button
          type="button"
          variant="ghost"
          onClick={handleReset}
          className="py-1 px-3 border rounded text-xs font-medium text-blue-600 border-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700 transition"
        >
          Reset
        </Button>
      </form>
      <div className="w-full md:w-[60%]">
        <Suggestions />
      </div>
    </div>
  );
};

export default Filter;
