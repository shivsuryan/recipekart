import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() loadPageEvent = new EventEmitter<{ loadPage: string }>();

  constructor() { }

  ngOnInit() {
    this.loadPageEvent.emit({ loadPage: 'recipes' });
    console.log('Event emitted: loadPage: \'recipes\'');
  }

  loadPage(event: { loadPage: string }) {
    this.loadPageEvent.emit(event);
  }

}
