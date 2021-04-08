import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls:  ['./pokemon.component.css']
})
export class PokemonComponent {
  @Input() pokemon: Pokemon;
  @Output() delete = new EventEmitter();

  onDeleteClick($event): void {
    $event.stopPropagation();
    this.delete.next();
  }
}
