import { Input, Output, Component, EventEmitter } from '@angular/core';

export interface DropdownItem {
  id: number,
  name: string
}

@Component({
  selector: 'multi-select-dropdown',
  template: 
 `<div class="multiselect-parent btn-group dropdown-multiselect col-lg-8">
      <button type="button" class="dropdown-toggle btn btn-default col-lg-12" (click)="toggleDropdown();">
        <span>{{getLabel()}}</span>
        &nbsp;<span class="caret"></span>
      </button>
      <ul class="dropdown-menu dropdown-menu-form col-lg-12" [style.display]="isOpen ? 'block' : 'none'" style="overflow: scroll">
        <li *ngIf="allowMultiselect"><a href="#" (click)="deselectAll($event);"><span class="glyphicon glyphicon-remove" ></span>&nbsp;Отменить все</a></li>
      <li>
        <div class="dropdown-header">
          <div class="control-group">
            <div *ngIf="items.length >= 10" class="input-group">
              <input type="text" class="form-control" [(ngModel)]="searchFilter" placeholder="Search" />
              <span class="glyphicon glyphicon-remove input-group-addon" style="top: 0px;" (click)="clearSearch()"></span>
            </div>
          </div>
        </div>
      </li>
        <li role="presentation" *ngFor="let item of items">
          <a class="link-dropdown-decoration" role="menuitem" (click)="toggleSelectedItem($event, item, isChecked(item.id))">
            <span class="glyphicon" [class.glyphicon-ok]="isChecked(item.id)"></span>
            {{item.name}}
          </a>
          </li>
        <li *ngIf="items == null || items.length == 0">No items</li>
      </ul>
    </div>
  `
})
export class MutliSelectDropdownComponent {
  @Input() selectionModel: Array<DropdownItem> = [];
  @Input() items: Array<DropdownItem>;
  @Output() selectionModelChange: EventEmitter<Array<DropdownItem>> = new EventEmitter();
  @Input()
  isOpen: boolean = false;
  searchFilter: string = '';
  @Input() allowMultiselect: boolean = true;

  toggleDropdown() : void {
    this.isOpen = !this.isOpen;
  }

  getLabel() : string {
    return this.allowMultiselect ? 'Выбрано '+ this.selectionModel.length : 
    (this.selectionModel == null || this.selectionModel.length == 0) ? 'Выберите значение' : this.selectionModel[0].name;
  }

  clearSearch() : void {
    this.searchFilter = '';
  }

  deselectAll(ev: Event) : void {
    this.selectionModel = [];
    this.clearSearch();
    this.onUpdate();
    ev.preventDefault();
  }

  isChecked(id: number) : boolean {
    return this.selectionModel.findIndex((itm) => itm.id == id) >= 0;
  }

  onUpdate() : void {
    this.selectionModelChange.emit(this.selectionModel);
  }

  toggleSelectedItem(ev: Event,item: DropdownItem, isChecked : boolean) : void {
    if (isChecked) {
      this.selectionModel = this.selectionModel.filter((itm) => itm.id != item.id);
      this.onUpdate();
      ev.preventDefault();
      return;
    }

    if (!this.allowMultiselect && this.selectionModel.length >0) {
      return;
    }
    const idx = this.selectionModel.findIndex((itm) => itm.id == item.id);

    if (idx >= 0) {
      this.selectionModel.splice(idx, 1);
    }
    else {
      this.selectionModel.push(item);
    }

    this.onUpdate();
    ev.preventDefault();
  }
}
