import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Pokemon } from './pokemon';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PokemonService {

  private pokemonsUrl = 'api/pokemons'; 

  constructor(
    private http: HttpClient) { }

  getPokemons (): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.pokemonsUrl)
      .pipe(
        catchError(this.handleError('getPokemons', []))
      );
  }

  getPokemonNo404<Data>(id: number): Observable<Pokemon> {
    const url = `${this.pokemonsUrl}/?id=${id}`;
    return this.http.get<Pokemon[]>(url)
      .pipe(
        map(Pokemons => Pokemons[0]), 
        catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
      );
  }


  getPokemon(id: number): Observable<Pokemon> {
    const url = `${this.pokemonsUrl}/${id}`;
    return this.http.get<Pokemon>(url).pipe(
      catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
    );
  }

  /* GET Pokemons whose name contains search term */
  searchPokemones(term: string): Observable<Pokemon[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      catchError(this.handleError<Pokemon[]>('searchPokemons', []))
    );
  }

  addPokemon (Pokemon: Pokemon): Observable<Pokemon> {
    return this.http.post<Pokemon>(this.pokemonsUrl, Pokemon, httpOptions).pipe(
      catchError(this.handleError<Pokemon>('addPokemon'))
    );
  }

  deletePokemon (Pokemon: Pokemon | number): Observable<Pokemon> {
    const id = typeof Pokemon === 'number' ? Pokemon : Pokemon.id;
    const url = `${this.pokemonsUrl}/${id}`;

    return this.http.delete<Pokemon>(url, httpOptions).pipe(
      catchError(this.handleError<Pokemon>('deletePokemon'))
    );
  }


  updatePokemon (Pokemon: Pokemon): Observable<any> {
    return this.http.put(this.pokemonsUrl, Pokemon, httpOptions).pipe(
      catchError(this.handleError<any>('updatePokemon'))
    );
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      return of(result as T);
    };
  }

}
