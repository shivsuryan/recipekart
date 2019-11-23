import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private userSub: Subscription;

  isAuthenticated = false;

  @Output() loadPageEvent = new EventEmitter<{ loadPage: string }>();

  constructor(private authService: AuthService, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.loadPageEvent.emit({ loadPage: 'recipes' });
    console.log('Event emitted: loadPage: \'recipes\'');
    this.userSub = this.authService.user.subscribe(user => {
      if (!user) {
        this.isAuthenticated = false;
      } else {
        this.isAuthenticated = true;
      }
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  loadPage(event: { loadPage: string }) {
    this.loadPageEvent.emit(event);
  }

  onSaveData() {
    this.dataStorageService.onSaveData();
  }

  onFetchData() {
    this.dataStorageService.onFetchData();
  }

}
