import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DisplayComponent } from './display.component';

describe('DisplayComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        DisplayComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(DisplayComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'text-highlighter'`, () => {
    const fixture = TestBed.createComponent(DisplayComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('text-highlighter');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(DisplayComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('text-highlighter app is running!');
  });
});
