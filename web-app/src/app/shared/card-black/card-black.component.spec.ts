import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardBlackComponent } from './card-black.component';

describe('CardBlackComponent', () => {
  let component: CardBlackComponent;
  let fixture: ComponentFixture<CardBlackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardBlackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardBlackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
