import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const pokemons = [
      { id: 11, name: 'Bulbasaur', strength: 10 },
      { id: 12, name: 'Charizard', strength: 5 },
      { id: 13, name: 'Pikachu', strength: 8 },
      { id: 14, name: 'Chikorita', strength: 15 },
      { id: 15, name: 'Jigglypuff', strength: 22 },
      { id: 16, name: 'Ponyta', strength: 50 },
      { id: 17, name: 'Dragonite', strength: 43 },
      { id: 18, name: 'Ivysaur', strength: 4 },
      { id: 19, name: 'Togepi', strength: 18 },
      { id: 20, name: 'Vanillish', strength: 15 }
    ];
    return {pokemons};
  }
}
