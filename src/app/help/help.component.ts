import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

}

/*

// component.ts

  pdfSrc = "";

  getFunc(){
    var url = "http://class-a.hekiyou.academy:9917/resume/get/2";
    
    this.http.get<any>(url).subscribe((res)=>{
      if (res.image)
      {
        var img = new Image();
        img.src = "data:image/png;base64,";
        img.src += res.data;
        document.body.appendChild(img);
      }
      else
      {
        this.pdfSrc = "data:application/pdf;base64,";
        this.pdfSrc += res.data;
      }
      
    });

  }

// component.html

<div id="resumeDisplay">
  <br>
    <button id="getResume"  (click)="getFunc()">Get Resume</button>
  <br>
  <pdf-viewer #pdfViewer [src]="pdfSrc" [render-text]="true" style="display: block; border: 1px solid black"></pdf-viewer>
  <br>
</div>

*/