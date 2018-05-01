import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mp4-upload',
  templateUrl: './mp4-upload.component.html',
  styleUrls: ['./mp4-upload.component.css']
})
export class Mp4UploadComponent implements OnInit {

  purpose = [
    {value: 'alternative', viewValue: 'alternative'},
    {value: 'saved', viewValue: 'saved'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
