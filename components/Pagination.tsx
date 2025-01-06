import { usePokemon } from "@/app/contexts/PokemonContext";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination() {
  const { currentPage, totalPages, setCurrentPage } = usePokemon();

  const buttonClass =
    "w-full sm:w-auto bg-white hover:bg-pokemon-yellow hover:text-pokemon-blue transition-colors duration-300";

  return (
    <div className="flex flex-row  justify-center items-center space-x-2  sm:space-y-0 sm:space-x-2 mt-8">
      <Button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        variant="outline"
        className={buttonClass}
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="hidden sm:inline ml-2">Previous</span>
      </Button>

      <span className="text-sm font-medium hidden sm:block">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="outline"
        className={buttonClass}
      >
        <ChevronRight className="w-5 h-5" />
        <span className="hidden sm:inline ml-2">Next</span>
      </Button>
    </div>
  );
}
