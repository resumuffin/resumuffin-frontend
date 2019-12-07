import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
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

  uploadURL = "http://springuserandcomments-env.sfredvy8k7.us-west-1.elasticbeanstalk.com/resume/upload/";
  getTagsUrl = "http://springuserandcomments-env.sfredvy8k7.us-west-1.elasticbeanstalk.com/tag/get/all";
  createTagsUrl = "http://springuserandcomments-env.sfredvy8k7.us-west-1.elasticbeanstalk.com/tag/create";
  isVisible = false;
  
  tagDict;
  tagMap = new Map();

  tags;
  title;
  desc;
  tagList = [];
  tagIDSet = new Set();
  tagIDList = [];

  test = false;

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      resume: ['']
    });
  }

  onSubmit(event: any){

    var auth = "http://springuserandcomments-env.sfredvy8k7.us-west-1.elasticbeanstalk.com/users/authenticate/user1/password";

    var formData = new FormData();

    // Gets resume/tags/title/description from template
    this.tags = event.target.tags.value;
    this.title = event.target.title.value;
    this.desc = event.target.desc.value;
    formData.append('file', this.uploadForm.get('resume').value);
    formData.append('description', this.desc);
    formData.append('title', this.title);
    // End get data from template

    // Parse tags from tag string and store in tagList
    var newStr = "";
    var addStr = "";

    for (var i = 0; i < this.tags.length; i++) {

      if (this.tags.charAt(i) == ",")
      {
        addStr = newStr.toLowerCase();
        this.tagList.push(addStr);
        newStr = ""
      }
      else if (this.tags.charAt(i-1) != ",")
      {
        newStr += this.tags.charAt(i);
        if (i == this.tags.length-1)
        {
          addStr = newStr.toLowerCase();
          this.tagList.push(addStr);
        }
      }
    }
    // End parse tags
    
    // Get dictionary of all tags
    this.http.get<any>(this.getTagsUrl).subscribe(
      async data => {
        this.tagDict = data;

        for (var i = 0; i < this.tagDict.length; i++)
        {
          this.tagMap.set(this.tagDict[i].text, this.tagDict[i].id);
        }

        setTimeout(() => {
          this.http.get<any>(auth).subscribe(
            (res) => console.log(res)
          );  
        }, 1);

        setTimeout(() => {
          this.createNewTags();
        }, 1);

        setTimeout(() => {

          var l1 = JSON.stringify(this.tagIDList);
          
          formData.append("tags", new Blob([l1], {type: "application/json"}));

          this.http.post<any>(this.uploadURL, formData).subscribe(
            (res) => console.log(res),
            (err) => console.log(err)
          );

        }, 3000);

      }
    );    
    // End get dictionary of all tags
  }

  createNewTags(){
    var tagsToAdd = [];
    for (var i = 0; i < this.tagList.length; i++)
    {
      if (this.tagMap.has(this.tagList[i]) == false)
      {
        tagsToAdd.push(this.tagList[i]);
      }
    }

    if (tagsToAdd.length == 0)
    {
      this.getTagIDs();
    }
    else
    {
      for (var i = 0; i < tagsToAdd.length; i++)
      {
        var params = new HttpParams();
        params = params.set('text', tagsToAdd[i]);
        this.http.post<any>(this.createTagsUrl, params).subscribe(
          (data) =>{
            if (i == tagsToAdd.length)
            {
              this.getTagIDs();
            }

          }
        );
      }
    }
    
    
  }

  getTagIDs(){
    this.http.get<any>(this.getTagsUrl).subscribe(
      data => {

        this.tagDict = data;
        
        for (var i = 0; i < this.tagDict.length; i++)
        {
          this.tagMap.set(this.tagDict[i].text, this.tagDict[i].id);
        }
        
        for (var i = 0; i < this.tagList.length; i++)
        {
          this.tagIDSet.add(this.tagMap.get(this.tagList[i]));
        }
        
        this.tagIDList = Array.from(this.tagIDSet);
      }
    );
    
  }

  onSelectFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get("resume").setValue(file);
    }

    this.isVisible = true;
  }

}