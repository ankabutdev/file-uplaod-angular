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

  formData = new FormData();

  globalval: File[] = [];

  method(event: any) {
    this.globalval.push(<File>event.target.files[0]);
  }

  getFormData(object: any) {
    let data = new FormData();
    for (let [key, val] of Object.entries(object)) {
      if (key === 'ImagePaths') {
        this.globalval.forEach(fileInput => {
          data.append("ImagePaths", fileInput, fileInput.name);
        });
      } else
        data.append(key, JSON.stringify(val));
    }
    return data;
  }

  uploadFiles() {
    var productData: Product = {
      CategoryId: 1,
      Name: "aaaaaaaaaaa",
      ImagePaths: this.globalval,
      Price: 1,
      Description: "1",
      CompanyId: 1,
      Frame: "1",
      Mounted: "",
      Screen: "/* Set appropriate value */",
      Buttons: "/* Set appropriate value */",
      Weight: 1,
      Backlight: " /* Set appropriate value */",
      Type: "/* Set appropriate value */",
      Foam: "/* Set appropriate value *",
      Mum: "/* Set appropriate value */",
      Smartpause: "/* Set appropriate value */",
      Turbopressure: "/* Set appropriate value */",
    };

    let res = this.getFormData(productData);

    // res.set("ImagePaths", this.formData);
    // this.formData = 

    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });
    let options = { headers: headers };

    try {
      this.http.post('http://localhost:5120/api/products', res).subscribe();
      //console.log(response);
      console.log("success");
      console.log();
    } catch (error) {
      console.error('Error:', error);
    }


    // this.http.post('http://localhost:5120/api/products/file', this.formData, options)
    //   .toPromise()
    //   .then(response => {
    //     console.log("Error Sohib " + response);
    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //   });
  }
}
