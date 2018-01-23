import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styles: []
})
export class ArtistComponent implements OnInit {

  private artista: any = { };
  private tracks: any[] = [];

  constructor(private _activatedRoute: ActivatedRoute, public _spotify: SpotifyService) { }

  ngOnInit() {

    // leer el url
    this._activatedRoute.params
                        .map(params => params['id'])
                        .subscribe(id => {
                          console.log(id);
                          // llamamos al servicio para traer el artista por id
                          this._spotify.getArtista(id)
                                        .subscribe(artista => {
                                          console.log(artista);
                                          this.artista = artista;
                                        });
                          // llamamos al servicio para traer el array con los topTracks
                          this._spotify.getTop(id)
                                        .map((resp: any) => resp.tracks)
                                        .subscribe(tracks => {
                                          console.log(tracks);
                                          this.tracks = tracks;
                                        });                     
                        });

  }

}
