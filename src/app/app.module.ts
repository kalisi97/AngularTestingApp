import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { PokemonDetailComponent }  from './pokemon-detail/pokemon-detail.component';
import { PokemonsComponent }      from './pokemons/pokemons.component';
import { PokemonSearchComponent }  from './pokemon-search/pokemon-search.component';
import { PokemonService }          from './pokemon.service';
import { PokemonComponent } from './pokemon/pokemon.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    PokemonsComponent,
    PokemonDetailComponent,
    PokemonSearchComponent,
    PokemonComponent
  ],
  providers: [ PokemonService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
