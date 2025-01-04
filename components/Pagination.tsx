import { usePokemon } from "@/app/contexts/PokemonContext";
import { Button } from "@/components/ui/button";

export default function Pagination() {
  const { currentPage, totalPages, setCurrentPage } = usePokemon();

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-2 mt-8">
      <Button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        variant="outline"
        className="w-full sm:w-auto bg-white hover:bg-pokemon-yellow hover:text-pokemon-blue transition-colors duration-300"
      >
        Previous
      </Button>
      <span className="text-sm font-medium">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="outline"
        className="w-full sm:w-auto bg-white hover:bg-pokemon-yellow hover:text-pokemon-blue transition-colors duration-300"
      >
        Next
      </Button>
    </div>
  );
}
