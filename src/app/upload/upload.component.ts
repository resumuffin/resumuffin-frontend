import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { stringify } from 'querystring';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  uploadForm: FormGroup;  
  springUrl = "http://class-a.hekiyou.academy:9917/resume/upload";
  isVisible = false;

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      resume: ['']
    });
  }

  onSubmit(event: any){
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('resume').value);
    var tags = event.target.tags.value;
    formData.append('tags', tags);

    this.http.post<any>(this.springUrl, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
  
  onSelectFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      //console.log(this.uploadForm.get("resume"));
      this.uploadForm.get("resume").setValue(file);
    }

    this.isVisible = true;
  }

}