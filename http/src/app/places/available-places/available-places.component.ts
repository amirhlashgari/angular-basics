import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.isFetching.set(true);
    // this.httpClient.get<{ places: Place[] }>('http://localhost:3000/places', { observe: 'events | response' }) ---> this option would cause see full response object
    const subscription = this.httpClient.get<{ places: Place[] }>('http://localhost:3000/places')
    .pipe(
      map((resData) => resData.places), // map is rxjs operator, that changes data before reaching to subscribe. all of them can be applied using pipe()
      catchError((err) => throwError(() => new Error('something went wrong'))) // throwError() is applied to return an observable
    )
    .subscribe({
      next: (places) => {
        this.places.set(places);
      },
      error: (err: Error) => {
        this.error.set(err.message);
      },
      complete: () => {
        this.isFetching.set(true);
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onSelectPlace(selectedPlace: Place) {
    // unless you don't subscribe the request it won't send the request (this is how observables work, if there is no subscribe on it it won't go to action)
    this.httpClient.put('http://localhost:3000/user-places', { placeId: selectedPlace.id })
    .subscribe({
      next: (resData) => {
        console.log(resData);
      }
    });
  }
}
