import { TestBed, ComponentFixture } from "@angular/core/testing";
import { PokemonDetailComponent } from "./pokemon-detail.component";
import { ActivatedRoute } from "@angular/router";
import { PokemonService } from "../pokemon.service";
import { Location } from '@angular/common';
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";

describe('PokemonDetailComponent', () => {
  let fixture: ComponentFixture<PokemonDetailComponent>;
  let mockActivatedRoute, mockPokemonService, mockLocation;

  beforeEach(() => {
    mockActivatedRoute = {
      snapshot: { paramMap: { get: () => { return '3'; }}}
    }
    mockPokemonService = jasmine.createSpyObj(['getPokemon', 'updatePokemon']);
    mockLocation = jasmine.createSpyObj(['back']);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [PokemonDetailComponent],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: PokemonService, useValue: mockPokemonService},
        {provide: Location, useValue: mockLocation},
      ]
    });
    fixture = TestBed.createComponent(PokemonDetailComponent);

    mockPokemonService.getPokemon.and.returnValue(of({id: 3, name: 'Togepi', strength: 100}));
  });

  it('should render pokemon name in a h2 tag', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('TOGEPI');
  })
})