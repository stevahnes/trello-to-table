import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { FileDropDirective } from './directives/file-drop.directive';

import { TabulatorComponent } from './tabulator.component';

describe('TabulatorComponent', () => {
  let component: TabulatorComponent;
  let fixture: ComponentFixture<TabulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgGridModule.withComponents([])],
      declarations: [TabulatorComponent, FileDropDirective]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('fileUpload', () => {
    it('should trigger onFileAdded when input has file', () => {
      spyOn(component, 'onFileAdded').and.callThrough();
      spyOn(component as any, 'processFile').and.callThrough();
      const fileInput: HTMLInputElement = fixture.debugElement.query(By.css('input[type=file]'))
        .nativeElement;
      const FILE_NAME = 'dummy.json';
      const dataTransfer = new DataTransfer();
      const file = new File(['RANDOM'], FILE_NAME);
      dataTransfer.items.add(file);
      fileInput.files = dataTransfer.files;
      fileInput.dispatchEvent(new Event('change'));
      expect(component.onFileAdded).toHaveBeenCalledTimes(1);
      expect(component.uploadedFileName).toEqual(FILE_NAME);
      expect((component as any).processFile).toHaveBeenCalledOnceWith(file);
    });

    it('should trigger onFileDropped when fileDropped output is emitted', () => {
      const directiveDebugElement = fixture.debugElement.query(By.directive(FileDropDirective));
      const directive = directiveDebugElement.injector.get(FileDropDirective);
      spyOn(component, 'onFileDropped').and.callThrough();
      spyOn(component as any, 'processFile').and.callThrough();
      const FILE_NAME = 'dummy.json';
      const file = new File(['RANDOM'], FILE_NAME);
      directive.fileDropped.emit(file);
      expect(component.onFileDropped).toHaveBeenCalledOnceWith(file);
      expect(component.uploadedFileName).toEqual(FILE_NAME);
      expect((component as any).processFile).toHaveBeenCalledOnceWith(file);
    });
  });

  describe('parseFileContent', () => {
    // it('should update resume if parsing is successful', () => {
    //   const content = '{"sampleKey":"sampleValue"}';
    //   (component as any).parseFileContent(content);
    //   expect(component.parseError).toBeFalse();
    // });

    it('should catch error and update parseError state if parsing is unsuccessful', () => {
      (component as any).resume = {};
      const content = 'UnexpectedChar{"testKey": "testVal"}';
      (component as any).parseFileContent(content);
      expect(component.parseError).toBeTrue();
    });
  });
});
