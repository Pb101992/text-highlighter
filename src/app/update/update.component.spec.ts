import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UpdateComponent } from './update.component';

describe('UpdateComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        UpdateComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(UpdateComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'text-highlighter'`, () => {
    const fixture = TestBed.createComponent(UpdateComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('text-highlighter');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(UpdateComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('text-highlighter app is running!');
  });
});
