import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';

import { Place } from './place.model';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private httpClient = inject(HttpClient);
  private errorService = inject(ErrorService);
  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces('http://localhost:3000/places', 'something went wrong when fetching places');
  }

  loadUserPlaces() {
    return this.fetchPlaces('http://localhost:3000/user-places', 'something went wrong when fetching user places')
      .pipe(
        tap({ // NOTE: we use tap() operator to update data without subscribing to it
          next: (userPlaces) => this.userPlaces.set(userPlaces)
        })
      );
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = this.userPlaces();

    if (!prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set([...prevPlaces, place]);
    }

    return this.httpClient.put('http://localhost:3000/user-places', { placeId: place.id })
      .pipe(catchError((err) => {
        // to avoid optimistic update if request fails
        this.userPlaces.set(prevPlaces);
        this.errorService.showError('failed to update favorite places');
        return throwError(() => new Error('failed to update favorite places'));
      }));
  }

  removeUserPlace(place: Place) {
    const prevPlaces = this.userPlaces();

    if (prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set(prevPlaces.filter(p => p.id !== place.id));
    }

    return this.httpClient.delete('http://localhost:3000/user-places' + place.id)
      .pipe(catchError((err) => {
        this.userPlaces.set(prevPlaces);
        this.errorService.showError('failed to remove favorite places');
        return throwError(() => new Error('failed to remove favorite places'));
      }));
  }

  private fetchPlaces(url: string, errorMessage: string) {
    // this.httpClient.get<{ places: Place[] }>('http://localhost:3000/places', { observe: 'events | response' }) ---> this option would cause see full response object
    return this.httpClient.get<{ places: Place[] }>(url)
      .pipe(
        map((resData) => resData.places), // map is rxjs operator, that changes data before reaching to subscribe. all of them can be applied using pipe()
        catchError((err) => throwError(() => new Error(errorMessage))) // throwError() is applied to return an observable
      )
  }
}
