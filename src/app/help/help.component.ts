import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  constructor(private http: HttpClient) { }
  pdfSrc = "";
  getFunc(){
    var url = "http://class-a.hekiyou.academy:9917/resume/get/2";
    var data;
    var img = new Image();
    
    this.http.get<any>(url).subscribe((res)=>{
      console.log(res);
      if (res.image)
      {
        img.src = "data:image/png;base64,";
        img.src += res.data;
        document.body.appendChild(img);
      }
      else
      {
        this.pdfSrc = "data:application/pdf;base64,";
        this.pdfSrc += res.data;
        //this.pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/pdf-test.pdf";
        //console.log(pdfSrc);
      }
      
    });

  }

  ngOnInit() {
  }

}