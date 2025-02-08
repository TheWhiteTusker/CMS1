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

  // Trigger file input when a layer is clicked
  triggerFileInput(index: number): void {
    this.fileInputs.toArray()[index].nativeElement.click();
  }

  // Handle manual file selection
  onFileSelected(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      this.uploadFileToSynology(file, index);
    }
  }

  // Allow drag-and-drop
  allowDrop(event: DragEvent): void {
    event.preventDefault();
  }

  // Handle drag-and-drop file uploads
  onDrop(event: DragEvent, index: number): void {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.uploadFileToSynology(file, index);
    }
  }

  // Upload file to Synology server
  private uploadFileToSynology(file: File, index: number): void {
    const formData = new FormData();
    formData.append('file', file);

    this.http.post('http://YOUR_SYNOLOGY_SERVER_IP/upload', formData).subscribe(
      (response: any) => {
        if (response.success) {
          this.layers[index] = {
            fileUrl: `http://YOUR_SYNOLOGY_SERVER_IP/files/${file.name}`,
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
