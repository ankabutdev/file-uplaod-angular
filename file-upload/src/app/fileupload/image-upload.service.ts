// image-upload.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Product {
    categoryId: number,
    name: string,
    imagePaths: FormData,
    price: number,
    description: string,
    companyId: number,
    frame: string,
    mounted: string,
    screen: string,
    buttons: string,
    weight: number,
    backlight: string,
    type: string,
    foam: string,
    mum: string,
    smartpause: string,
    turbopressure: string,
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
