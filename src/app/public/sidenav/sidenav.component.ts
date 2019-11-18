import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  private mediaMatch: MediaQueryList = matchMedia("(max-width:950px)")

  constructor() { }

  ngOnInit() {
  }

  telaMenor(){
    return this.mediaMatch.matches;
  }


}
