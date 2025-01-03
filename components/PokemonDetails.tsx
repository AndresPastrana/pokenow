import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface PokemonDetailsProps {
  pokemon: any
}

export default function PokemonDetails({ pokemon }: PokemonDetailsProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="bg-blue-500 text-white">
        <CardTitle className="text-3xl capitalize">{pokemon.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-48 h-48 relative">
            {pokemon.sprites.front_default ? (
              <Image
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                layout="fill"
                objectFit="contain"
                className="transition-transform duration-300 hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                No image
              </div>
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4">Details</h2>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="font-semibold">Type(s):</dt>
                <dd>
                  {pokemon.types.map((type: any) => (
                    <span key={type.type.name} className="capitalize mr-2">
                      {type.type.name}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Abilities:</dt>
                <dd>
                  {pokemon.abilities.map((ability: any) => (
                    <span key={ability.ability.name} className="capitalize mr-2">
                      {ability.ability.name}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Height:</dt>
                <dd>{pokemon.height / 10} m</dd>
              </div>
              <div>
                <dt className="font-semibold">Weight:</dt>
                <dd>{pokemon.weight / 10} kg</dd>
              </div>
              <div>
                <dt className="font-semibold">Base Experience:</dt>
                <dd>{pokemon.base_experience}</dd>
              </div>
            </dl>
            <h2 className="text-xl font-semibold mt-6 mb-4">Stats</h2>
            <dl className="grid grid-cols-2 gap-4">
              {pokemon.stats.map((stat: any) => (
                <div key={stat.stat.name}>
                  <dt className="font-semibold capitalize">{stat.stat.name}:</dt>
                  <dd>{stat.base_stat}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link href="/">
            <Button variant="outline">Back to List</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

