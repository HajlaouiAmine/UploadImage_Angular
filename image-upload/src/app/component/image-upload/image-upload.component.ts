import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadImageService } from 'src/app/service/upload-image.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {

  
  selectedFiles?: FileList;
  currentFile?: File;
  message = '';
  imageUrl: string | undefined;
  imageForm: FormGroup;


  constructor(private uploadImageService: UploadImageService,private formBuilder: FormBuilder){
    this.imageForm = this.formBuilder.group({
      name: ['', Validators.required],
      user: ['', Validators.required],
      path: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      this.imageForm.patchValue({
        image: this.selectedFiles[0]
      });
    }
  }

  upload(): void {
    this.message = '';

    if (this.selectedFiles && this.imageForm.valid) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        const imageData = JSON.stringify({
          name: this.imageForm.get('name')?.value,
          user: this.imageForm.get('user')?.value,
          path: this.imageForm.get('path')?.value
        });

        this.uploadImageService.uploadImage(imageData, this.currentFile).subscribe({
          next: (event: any) => {
            if (event.body) {
              this.imageUrl = event.body.imageUrl;
            }
          },
          error: (err: any) => {
            console.log(err);
            this.message = 'Could not upload the file!';
            this.currentFile = undefined;
          }
        });
      }

      this.selectedFiles = undefined;
    }
  }
}