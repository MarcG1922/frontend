import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit closeModal when onClose is called', () => {
    spyOn(component.closeModal, 'emit');
    component.onClose();
    expect(component.closeModal.emit).toHaveBeenCalled();
  });

  it('should emit actionClick when onAction is called', () => {
    spyOn(component.actionClick, 'emit');
    component.onAction();
    expect(component.actionClick.emit).toHaveBeenCalled();
  });

  it('should not show modal when show is false', () => {
    component.show = false;
    fixture.detectChanges();
    const modalElement = fixture.nativeElement.querySelector('.modal');
    expect(modalElement).toBeNull();
  });

  it('should show modal when show is true', () => {
    component.show = true;
    fixture.detectChanges();
    const modalElement = fixture.nativeElement.querySelector('.modal');
    expect(modalElement).toBeTruthy();
  });
}); 