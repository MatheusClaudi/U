import { Component, OnInit, Input } from '@angular/core';
import { TagService } from '../../services/tag.service';
import { Tag } from 'src/app/models/Tag';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.css'],
})
export class LabelsComponent implements OnInit {
  tags: Array<Tag> = [];
  public myForm: FormGroup;
  public menu: boolean = false;
  public enabledEdition: boolean;
  public tagOnEditId: Number;

  constructor(private tagService: TagService) {
    this.myForm = new FormGroup({
      text: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(200),
      ]),
    });
  }

  ngOnInit() {
    this.tagService.getAllTags().subscribe((tags) => {
      tags.forEach((tag) => {
        this.tags.push(tag);
      });
    });
  }

  closeMenu() {
    if (this.menu) {
      this.menu = false;
    }
  }

  enableEdit(id, event) {
    event.stopPropagation();
    this.tagOnEditId = id;
    this.enabledEdition = true;
    console.log(id);
  }

  closeEdition() {
    if (this.enabledEdition) {
      this.enabledEdition = false;
    }
  }

  updateTag(id, event) {
    if (event.key == 'Enter') {
      this.tagOnEditId = undefined;
      let currentValue = event.target.value;
      console.log(currentValue);
      console.log(id);

      let newTag = new Tag();
      newTag.id = id;
      newTag.text = currentValue;
      const index = this.tags.findIndex((tag) => tag.id === id);
      this.tags[index].text = currentValue;

      this.tagService.updateTag(newTag.id, newTag).subscribe();
    } else if (event.key == 'Escape') {
      this.closeEdition();
    }
  }

  createTag(): void {
    if (this.myForm.valid) {
      let tag = new Tag();
      tag.text = this.myForm.get('text').value;

      this.tagService.save(tag).subscribe((tag) => {
        this.tags.push(tag);
        this.myForm.reset();
      });
    }
  }

  deleteTag(id) {
    this.tagService.delete(id).subscribe(() => {
      const index = this.tags.findIndex((tag) => tag.id === id);
      this.tags.splice(index, 1);
    });
  }
}
