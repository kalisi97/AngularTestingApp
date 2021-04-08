import { Component, OnInit } from '@angular/core';

import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {
  pokemons: Pokemon[];

  constructor(private PokemonService: PokemonService) { }

  ngOnInit() {
    this.getPokemons();
  }

  getPokemons(): void {
    this.PokemonService.getPokemons()
    .subscribe(Pokemones => this.pokemons = Pokemones);
  }

  add(name: string, strength: number): void {
    name = name.trim();
    if (!name) { return; }
    this.PokemonService.addPokemon({ name, strength } as Pokemon)
      .subscribe(Pokemon => {
        this.pokemons.push(Pokemon);
      });
  }

  delete(Pokemon: Pokemon): void {
    this.pokemons = this.pokemons.filter(h => h !== Pokemon);
    this.PokemonService.deletePokemon(Pokemon).subscribe();
  }

}
