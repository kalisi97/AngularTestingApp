import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PokemonsComponent } from "./pokemons.component";
import { Component, Input } from "@angular/core";
import { PokemonService } from "../pokemon.service";
import { of } from "rxjs";
import { Pokemon } from "../pokemon";
import { By } from "@angular/platform-browser";

describe('PokemonesComponent (shallow tests)', () => {
  let fixture: ComponentFixture<PokemonsComponent>;
  let mockPokemonService;
  let POKEMONS;

  @Component({
    selector: 'app-pokemon',
    template: '<div></div>',
  })
  class FakePokemonComponent {
    @Input() pokemon: Pokemon;
  }  

  beforeEach(() => {
    POKEMONS = [
      {id:1, name: 'Togepi', strength: 8},
      {id:2, name: 'Pikachu', strength: 24},
      {id:3, name: 'Chikorita', strength: 55}
    ]
    mockPokemonService = jasmine.createSpyObj(['getPokemons', 'addPokemon', 'deletePokemon']);

    TestBed.configureTestingModule({
      declarations: [
        PokemonsComponent,
        FakePokemonComponent
      ],
      providers: [
        { provide: PokemonService, useValue: mockPokemonService }
      ],
    })
    fixture = TestBed.createComponent(PokemonsComponent);
  });

  it('should set pokemons correctly from the service', () => {
    mockPokemonService.getPokemons.and.returnValue(of(POKEMONS))
    fixture.detectChanges();

    expect(fixture.componentInstance.pokemons.length).toBe(3);
  });

  it('should create one li for each pokemon', () => {
    mockPokemonService.getPokemons.and.returnValue(of(POKEMONS))
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
  })
})