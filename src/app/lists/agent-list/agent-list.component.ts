import { Component } from '@angular/core';
import * as tableData from './agent-data-list';
import { LocalDataSource } from 'ng2-smart-table';
@Component({
  templateUrl: './agent-list.component.html'
})
export class AgentListComponent {
  source: LocalDataSource;
  constructor() {
    this.source = new LocalDataSource(tableData.data); // create the source
  }
  settings = tableData.settings;
  settings2 = tableData.settings2;
}
