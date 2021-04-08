import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Pokemon } from './pokemon';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PokemonService {

  private pokemonsUrl = 'api/pokemons'; 

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getPokemons (): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.pokemonsUrl)
      .pipe(
        tap(pokemons => this.log(`fetched pokemons`)),
        catchError(this.handleError('getPokemons', []))
      );
  }

  getPokemonNo404<Data>(id: number): Observable<Pokemon> {
    const url = `${this.pokemonsUrl}/?id=${id}`;
    return this.http.get<Pokemon[]>(url)
      .pipe(
        map(Pokemons => Pokemons[0]), 
        tap(p => {
          const outcome = p ? `fetched` : `did not find`;
          this.log(`${outcome} Pokemon id=${id}`);
        }),
        catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
      );
  }


  getPokemon(id: number): Observable<Pokemon> {
    const url = `${this.pokemonsUrl}/${id}`;
    return this.http.get<Pokemon>(url).pipe(
      tap(_ => this.log(`fetched Pokemon id=${id}`)),
      catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
    );
  }

  /* GET Pokemons whose name contains search term */
  searchPokemones(term: string): Observable<Pokemon[]> {
    if (!term.trim()) {
      // if not search term, return empty Pokemon array.
      return of([]);
    }
    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap(_ => this.log(`found pokemons matching "${term}"`)),
      catchError(this.handleError<Pokemon[]>('searchPokemons', []))
    );
  }

  addPokemon (Pokemon: Pokemon): Observable<Pokemon> {
    return this.http.post<Pokemon>(this.pokemonsUrl, Pokemon, httpOptions).pipe(
      tap((Pokemon: Pokemon) => this.log(`added Pokemon w/ id=${Pokemon.id}`)),
      catchError(this.handleError<Pokemon>('addPokemon'))
    );
  }

  deletePokemon (Pokemon: Pokemon | number): Observable<Pokemon> {
    const id = typeof Pokemon === 'number' ? Pokemon : Pokemon.id;
    const url = `${this.pokemonsUrl}/${id}`;

    return this.http.delete<Pokemon>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Pokemon id=${id}`)),
      catchError(this.handleError<Pokemon>('deletePokemon'))
    );
  }


  updatePokemon (Pokemon: Pokemon): Observable<any> {
    return this.http.put(this.pokemonsUrl, Pokemon, httpOptions).pipe(
      tap(_ => this.log(`updated Pokemon id=${Pokemon.id}`)),
      catchError(this.handleError<any>('updatePokemon'))
    );
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a PokemonService message with the MessageService */
  private log(message: string) {
    this.messageService.add('PokemonService: ' + message);
  }
}
