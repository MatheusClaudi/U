import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'filter-feedback',
  templateUrl: './filter-feedback.component.html',
  styleUrls: ['./filter-feedback.component.css'],
})
export class FilterFeedbackComponent implements OnInit {
  @Input() selected: Array<any>;
  @Output() selectedItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() deselectedItem: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  dropdownList = [];
  dropdownSettings = {};
  ngOnInit() {
    this.dropdownList = [
      { id: 1, text: 'Ativo' },
      { id: 2, text: 'Inativo' },
      { id: 3, text: 'Finalizado' },
    ];
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'text',
      noDataAvailablePlaceholderText: 'Sem status',
    };
  }
  onItemSelect(item: any) {
    // console.log('onItemSelect', item);
    this.selectedItem.emit(item);
  }

  onItemDeselect(item: any) {
    // console.log('Item Deselected:', item);
    this.deselectedItem.emit(item);
  }
}
