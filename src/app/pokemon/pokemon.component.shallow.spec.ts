import { TestBed, ComponentFixture } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";
import { PokemonComponent } from "./pokemon.component";

describe('PokemonComponent (shallow tests)', () => {
  let fixture: ComponentFixture<PokemonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(PokemonComponent);
  });

  it('should have the correct pokemon', () => {
    fixture.componentInstance.pokemon = { id: 1, name: 'Togepi', strength: 3};

    expect(fixture.componentInstance.pokemon.name).toEqual('Togepi');
  });

  it('should render the pokemon name in an anchor tag', () => {
    fixture.componentInstance.pokemon = { id: 1, name: 'Togepi', strength: 3};
    fixture.detectChanges();

    let deA = fixture.debugElement.query(By.css('a'));
    expect(deA.nativeElement.textContent).toContain('Togepi');

    expect(fixture.nativeElement.querySelector('a').textContent).toContain('Togepi');
  })
})