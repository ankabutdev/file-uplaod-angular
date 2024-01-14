// image-upload.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Product {
    CategoryId: number,
    Name: string,
    ImagePaths: File[],
    Price: number,
    Description: string,
    CompanyId: number,
    Frame: string,
    Mounted: string,
    Screen: string,
    Buttons: string,
    Weight: number,
    Backlight: string,
    Type: string,
    Foam: string,
    Mum: string,
    Smartpause: string,
    Turbopressure: string,
}

@Injectable({
    providedIn: 'root',
})
export class ImageUploadService {
    constructor(private http: HttpClient) { }

    async uploadMultipleImages(data: Product) {
        return await this.http.post('http://localhost:5120/api/products', data);
    }
}
