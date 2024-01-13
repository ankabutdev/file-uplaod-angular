import { Component } from '@angular/core';
import { ImageUploadService, Product } from './image-upload.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface FileInput {
  file?: File;
  fileName: string;
}

@Component({
  selector: 'app-fileupload',
  styleUrls: ['./fileupload.component.css'],
  templateUrl: './fileupload.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class FileuploadComponent {
  fileInputs: FileInput[] = [];

  constructor(private http: HttpClient) { }

  onFileChange(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      this.fileInputs[index] = { file, fileName: file.name };
    }
  }

  removeFile(index: number) {
    this.fileInputs.splice(index, 1);
  }

  addFile() {
    this.fileInputs.push({ fileName: '' });
  }

  async uploadFiles() {
    const formData = new FormData();
    this.fileInputs.forEach(fileInput => {
      if (fileInput.file) {
        formData.append('files', fileInput.file);
      }
    });

    var productData = {
      categoryId: 1,
      name: "",
      imagePaths: formData,
      price: 1,
      description: "",
      companyId: 1,
      frame: "",
      mounted: "",
      screen: "/* Set appropriate value */",
      buttons: "/* Set appropriate value */",
      weight: 1,
      backlight: " /* Set appropriate value */",
      type: "/* Set appropriate value */",
      foam: "/* Set appropriate value *",
      mum: "/* Set appropriate value */",
      smartpause: "/* Set appropriate value */",
      turbopressure: "/* Set appropriate value */",
    };
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json'
    });

    let options = { headers: headers };

    // (this.http.post<Product>('http://localhost:5120/api/products', productData, options)).subscribe(response => {
    //   console.log(response);
    // });

    try {
      const response = await this.http.post<Product>('http://localhost:5120/api/products', formData).toPromise();
      //console.log(response);
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
