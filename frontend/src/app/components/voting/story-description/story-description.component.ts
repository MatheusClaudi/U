import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import { UserStoryService } from 'src/app/services/userStory.service';

@Component({
  selector: 'app-story-description',
  templateUrl: './story-description.component.html',
  styleUrls: ['./story-description.component.css']
})
export class StoryDescriptionComponent implements OnInit, OnChanges {

  @Input("userStoryId")
  public userStoryId;

  public userStory;

  constructor(private _uss: UserStoryService) { }

  ngOnInit(): void {

    this.loadStory();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.userStoryId = changes.userStoryId.currentValue;
    this.loadStory();
  }

  loadStory(){
    this._uss.getUserStoryById(this.userStoryId).subscribe(
      data => {
        console.log(data);
        this.userStory = data;
      }
    )
  }

}
