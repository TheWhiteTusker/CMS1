import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-kioask1',
  templateUrl: './kioask1.component.html',
  styleUrl: './kioask1.component.css'
})
export class Kioask1Component {
  layers = [
    { fileUrl: '', fileType: '', fileName: '' },
    { fileUrl: '', fileType: '', fileName: '' },
    { fileUrl: '', fileType: '', fileName: '' },
    { fileUrl: '', fileType: '', fileName: '' }
  ];

  @ViewChildren('fileInput') fileInputs!: QueryList<ElementRef>;

  constructor(private http: HttpClient) {}

  triggerFileInput(index: number): void {
    this.fileInputs.toArray()[index].nativeElement.click();
  }

  onFileSelected(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      this.uploadFileToSynology(file, index);
    }
  }

  allowDrop(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent, index: number): void {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.uploadFileToSynology(file, index);
    }
  }

  private uploadFileToSynology(file: File, index: number): void {
    const formData = new FormData();
    formData.append('file', file);

    const apiUrl = 'http://192.168.1.8:3000/upload';

    this.http.post(apiUrl, formData).subscribe(
      (response: any) => {
        if (response.message === 'File uploaded successfully') {
          this.layers[index] = {
            fileUrl: `http://192.168.1.8:3000/files/${file.name}`,
            fileType: file.type.startsWith('image') ? 'image' : 'video',
            fileName: file.name
          };
        } else {
          alert('File upload failed.');
        }
      },
      (error) => {
        console.error('Upload error:', error);
        alert('Error uploading file.');
      }
    );
  }
}
