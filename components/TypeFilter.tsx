import { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TypeFilterProps {
  onFilterChange: (type: string) => void
}

export default function TypeFilter({ onFilterChange }: TypeFilterProps) {
  const [types, setTypes] = useState<string[]>([])

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/type')
      .then(response => response.json())
      .then(data => {
        const fetchedTypes = data.results.map((type: { name: string }) => type.name)
        setTypes(['all', ...fetchedTypes])
      })
      .catch(error => console.error('Error fetching Pokémon types:', error))
  }, [])

  return (
    <div className="w-full sm:w-48">
      <Select onValueChange={onFilterChange}>
        <SelectTrigger className="w-full bg-white border-pokemon-blue focus:ring-2 focus:ring-pokemon-blue focus:border-transparent">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          {types.map(type => (
            <SelectItem key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

