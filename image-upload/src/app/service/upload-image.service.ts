import { Injectable } from '@angular/core';
import { Image } from '../model/image';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  private baseUrl = 'http://localhost:8080/api/upload';

  constructor(private http: HttpClient) { }

  uploadImage(imageData: string, image: File): Observable<Image> {
    const formData: FormData = new FormData();
    formData.append('image', imageData);
    formData.append('imageUrl', image, image.name);
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });
    return this.http.post<Image>(`${this.baseUrl}/add`, formData,{ headers });
  }
}
