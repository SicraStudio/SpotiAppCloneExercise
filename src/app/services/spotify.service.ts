import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';




@Injectable()
export class SpotifyService {

  private artistas: any[] = [];
  private tracks: any[] = [];
  private url: string = 'https://api.spotify.com/v1/';
  private token: string = 'BQDgaEOEG4kvQi0egvNqqGVEFTRXT3Yat79M6ZHmcSK87wDT4Fi_t95HJR9JM3Xx88nHqVQUKAovLaoE_YU';

  constructor(public http: HttpClient) { 
    console.log('SpotifyService:::> READY!');
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'authorization': 'Bearer ' + this.token
    });
  }
  // https://api.spotify.com/v1/artists/6eUKZXaKkcviH0Ku9w2n3V/top-tracks?country=ES
  public getTop(id: string) {
    let url = `${ this.url }artists/${ id }/top-tracks?country=ES`;

    let headers = this.getHeaders();

    return this.http.get(url, { headers });
  }

  public getArtista(id: string) {

    let url = `${ this.url }artists/${ id }`;

    // creamos los headers de la peticion get
    let headers = this.getHeaders();

    return this.http.get(url, { headers });
  }
    
  public getArtistas(termino: string) {

    let url = `${ this.url }search?query=${ termino }&type=artist&limit=20`;

    // creamos los headers de la peticion get
    let headers = this.getHeaders();

    return this.http.get(url, { headers })
                .map((resp: any) =>{
                  this.artistas = resp.artists.items;
                  return this.artistas;
                });

  }
    
}
