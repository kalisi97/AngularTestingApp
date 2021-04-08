
import { of } from "rxjs";
import { Pokemon } from "../pokemon";
import { PokemonsComponent } from "./pokemons.component";

describe('PokemonsComponent', () => {
  let component: PokemonsComponent;
  let POKEMONS;
  let mockPokemonService;

  beforeEach(() => {
    POKEMONS = [
        { id: 1, name: 'Bulbasaur', strength: 10 },
        { id: 2, name: 'Chikorita', strength: 15 },
        { id: 3, name: 'Togepi', strength: 18 },
    ]
    mockPokemonService = jasmine.createSpyObj(['getPokemons', 'addPokemon', 'deletePokemon']);
    component = new PokemonsComponent(mockPokemonService);
  })

  describe('delete', () => {

    it('should remove the indicated pokemon from the pokemons list', () => {
      //act
      mockPokemonService.deletePokemon.and.returnValue(of(true))
      component.pokemons = POKEMONS;
      //arange
      component.delete(POKEMONS[2]);
      //assert
      expect(component.pokemons.length).toBe(2);
    })

    it('should call deletePokemon', () => {
      mockPokemonService.deletePokemon.and.returnValue(of(true))
      component.pokemons = POKEMONS;

      component.delete(POKEMONS[2]);

      expect(mockPokemonService.deletePokemon).toHaveBeenCalledWith(POKEMONS[2]);
    })
  })

  describe('addPokemon', () => {

    it('should add pokemon in the pokemons list', () => {
      //act
      mockPokemonService.addPokemon.and.returnValue(of(true))
      component.pokemons = POKEMONS;
      //arange
      component.add('Pikachu',20);
      //assert
      expect(component.pokemons.length).toBe(4);
    })

    it('should call addPokemon', () => {
      mockPokemonService.addPokemon.and.returnValue(of(true))
      component.pokemons = POKEMONS;

      component.add('Pikachu',20);

      expect(mockPokemonService.addPokemon).toHaveBeenCalledWith(Object({ name: 'Pikachu', strength: 20 }));
    })
  })

  describe('getPokemons', () => {

    it('should call getPokemons', () => {
      mockPokemonService.getPokemons.and.returnValue(of(true))
      component.pokemons = POKEMONS;

      component.getPokemons();
      
      expect(mockPokemonService.getPokemons).toHaveBeenCalledTimes(1);
    })
  })

})