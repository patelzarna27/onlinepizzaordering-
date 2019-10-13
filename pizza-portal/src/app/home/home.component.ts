import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pSize: string[] = ['Small', 'Medium', 'Large', 'X-Large'];
  pQuntity: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  constructor() { }

  ngOnInit() {
  }

}
