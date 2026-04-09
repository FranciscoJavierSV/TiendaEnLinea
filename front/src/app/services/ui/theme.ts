import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class Theme {
  private darkTheme = new BehaviorSubject<boolean>(false);
  darkTheme$ = this.darkTheme.asObservable();

  toggleTheme() {
    this.darkTheme.next(!this.darkTheme.value);
  }

  isDarkTheme(): boolean {
    return this.darkTheme.value;
  }
}
