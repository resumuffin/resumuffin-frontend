import { Component, OnInit } from '@angular/core';
import { TagService } from '../tag-service.service'
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import { templateJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  tags: Object;
  length: number;
  out: Array<Array<any>>;
  constructor(private tagService: TagService) { }

  setTag(event){
    var id = event.target.text;
    this.tagService.setTag(id);
  }

  ngOnInit() {
    this.tagService.getAllTags().subscribe(data => {
      this.tags = data
      console.log(this.tags);
      this.length = (Object.keys(this.tags).length);
      var temp = [];
      for (var i = 0; i < this.length; i++){
        temp.push(this.tags[i].text)
        if (i%5 == 0 && i != 0){
          this.out.push(temp);
          temp = [];
        }
      }
    }
    );
  }
}
