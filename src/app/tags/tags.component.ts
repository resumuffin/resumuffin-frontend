import { Component, OnInit } from '@angular/core';
import { TagService } from '../tag-service.service'

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  tags: Object;
  constructor(private tagService: TagService) { }

  setTag(event){

    var id = event.target.text;
    this.tagService.setTag(id);

  }

  ngOnInit() {
    this.tagService.getAllTags().subscribe(data => {
      this.tags = data
      console.log(this.tags);
    }
    );
  }

}
