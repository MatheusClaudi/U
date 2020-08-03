import {
  Component,
  OnInit,
  ViewEncapsulation,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { TagService } from '../../services/tag.service';
import { Tag } from 'src/app/models/Tag';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { RetrospectiveService } from '../../services/retrospective.service';
@Component({
  selector: 'tag-menu',
  templateUrl: './tag-menu.component.html',
  styleUrls: ['./tag-menu.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TagMenuComponent implements OnInit {
  form: FormGroup;
  ShowFilter = true;
  limitSelection = false;
  disabled = false;
  tags: Array<Tag> = [];
  response: Array<Tag> = [];
  @Input() selected: Array<Tag>;
  dropdownSettings: any = {};

  @Output('onSelectTag') updateTag: EventEmitter<Tag> = new EventEmitter();
  @Output('onDeleteTag') removeTag: EventEmitter<Tag> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private tagService: TagService,
    private retrospective: RetrospectiveService
  ) {}

  ngOnInit() {
    this.tagService.getAllTags().subscribe((tags) => {
      tags.forEach((tag) => {
        this.response.push(tag);
      });
      this.tags = this.response;
    });
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'text',
      itemsShowLimit: 3,
      limitSelection: 3,
      allowSearchFilter: this.ShowFilter,
      searchPlaceholderText: 'Pesquisar',
      noDataAvailablePlaceholderText: 'Sem tags cadastradas',
    };
  }

  getTag(item: Tag) {
    this.updateTag.emit(item);
  }

  deleteTag(item: Tag) {
    this.removeTag.emit(item);
  }
}
