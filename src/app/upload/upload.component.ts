import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  uploadForm: FormGroup;  

  uploadURL = "http://springuserandcomments-env.sfredvy8k7.us-west-1.elasticbeanstalk.com/resume/upload";
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
    this.http.get<any>(this.getTagsUrl, { withCredentials: true}).subscribe(
      async data => {
        this.tagDict = data;

        for (var i = 0; i < this.tagDict.length; i++)
        {
          this.tagMap.set(this.tagDict[i].text, this.tagDict[i].id);
        }

        setTimeout(() => {
          this.http.get<any>(auth, { withCredentials: true}).subscribe(
            (res) => console.log(res)
          );  
        }, 1);

        setTimeout(() => {
          this.createNewTags();
        }, 1);

        // Delay resume upload by 1 second to ensure authentication/tag formatting has time to run
        setTimeout(() => {

          // Make ID list into JSON
          var l1 = JSON.stringify(this.tagIDList);
  
          // Make JSON ID list into blob
          formData.append("tags", new Blob([l1], {type: "application/json"}));

          console.log(formData.get("file"));
          console.log(formData.get("title"));
          console.log(formData.get("description"));
          console.log(formData.get("tags"));
          console.log(this.tagIDList);

          var currentID;

          // Pass formData to upload endpoint
          this.http.post<any>(this.uploadURL, formData, { withCredentials: true}).subscribe(
            (res) => {
              currentID = res.id;
              localStorage.setItem("id", currentID);
            }
          );

        }, 3000);

        setTimeout(() => {
          this.router.navigate(['/discussion']);
        }, 5000);

      }
    );    
    // End get dictionary of all tags
  }

  createNewTags(){
    
    // List to store tags that must be registered in DB
    var tagsToAdd = [];

    // Search through dictionary of tags currently in DB and add user tag to list if not present
    for (var i = 0; i < this.tagList.length; i++)
    {
      if (this.tagMap.has(this.tagList[i]) == false)
      {
        tagsToAdd.push(this.tagList[i]);
      }
    }

    // If all tags are already present, run get ID function
    if (tagsToAdd.length == 0)
    {
      this.getTagIDs();
    }
    // Otherwise, for each tag not already registered in DB, hit endpoint to register
    else
    {
      for (var i = 0; i < tagsToAdd.length; i++)
      {
        var params = new HttpParams();
        params = params.set('text', tagsToAdd[i]);
        this.http.post<any>(this.createTagsUrl, params, { withCredentials: true}).subscribe(
          (data) =>{
            // If last tag in list, run get ID function
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
    // Get all currently registered tags
    this.http.get<any>(this.getTagsUrl, { withCredentials: true}).subscribe(
      data => {

        this.tagDict = data;
        
        // Creates dictionary with tag text and tag ID from db
        for (var i = 0; i < this.tagDict.length; i++)
        {
          this.tagMap.set(this.tagDict[i].text, this.tagDict[i].id);
        }
        
        // Create set of all tag IDs represented by text tags entered by user
        // Use set to eliminate duplicate tag entries
        for (var i = 0; i < this.tagList.length; i++)
        {
          this.tagIDSet.add(this.tagMap.get(this.tagList[i]));
        }
        
        // Create list from set which holds each unique ID of tags entered by user
        this.tagIDList = Array.from(this.tagIDSet);
      }
    );
    
  }

  onSelectFile(event) {
    // Sets file upload value
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get("resume").setValue(file);
    }

    // Makes fields to add title/tags/description visible
    this.isVisible = true;
  }

}