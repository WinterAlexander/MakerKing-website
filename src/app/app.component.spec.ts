import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

describe('AppComponent', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the navigation buttons and the footer', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = Array.from(compiled.querySelectorAll('app-header .head-btn')).map(b => b.textContent?.trim());
    expect(buttons).toEqual(['News', 'Support us', 'Leaderboard', 'Press Kit']);
    expect(compiled.querySelector('app-footer .copyright')?.textContent).toContain('Green Frisbee Games Inc.');
  });

  it('should display the server stats and the login form in the header', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    TestBed.inject(HttpTestingController)
      .expectOne(environment.server + '/serverstats')
      .flush({ onlinePlayers: 3, registeredPlayers: 1234 });
    await fixture.whenStable();
    fixture.detectChanges();
    const header = (fixture.nativeElement as HTMLElement).querySelector('app-header') as HTMLElement;
    expect(header.textContent).toContain('1234 players registered');
    expect(header.textContent).toContain('3 players online');
    expect(header.querySelector('#username')).toBeTruthy();
    expect(header.querySelector('#password')).toBeTruthy();
  });
});
