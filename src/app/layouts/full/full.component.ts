import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-root',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent  {
  color = 'blue';
  showSettings = false;
  showMinisidebar = false;
  showDarktheme = false;
  showRtl = false;

  public config: PerfectScrollbarConfigInterface = {};

  constructor(public router: Router) {}
}
