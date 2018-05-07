import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  postForm: FormGroup;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.postForm = this.formBuilder.group({
      postTitle: ["",Validators.required],
      userId: ["", Validators.required],
      photoUrl: ["",Validators.required],
      photoId:  this.formBuilder.group({
        photoId1: "",
        photoId2: "",
        photoId3: "",
        photoId4: ""
      })
    })
  }

  onSubmit(formValue) {

  }
  
 }
