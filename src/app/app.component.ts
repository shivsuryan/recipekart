import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reipekart';
  pageToLoad = 'recipes';

  loadPage(event: { loadPage: string }) {
    if (event.loadPage === 'recipes') {
      this.pageToLoad = 'recipes';
    } else {
      this.pageToLoad = 'shopping-list';
    }
  }
}
