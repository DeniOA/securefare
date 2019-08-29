import { Component } from '@angular/core';
import * as tableData from './staff-data-list';
import { LocalDataSource } from 'ng2-smart-table';
@Component({
  templateUrl: './staff-list.component.html'
})
export class StaffListComponent {
  source: LocalDataSource;
  constructor() {
    this.source = new LocalDataSource(tableData.data); // create the source
  }
  settings = tableData.settings;
  settings2 = tableData.settings2;
}