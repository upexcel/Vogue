import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  postForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public _http: HttpClient) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.postForm = this.formBuilder.group({
      title: ["", Validators.required],
      userID: ["", Validators.required],
      inspirationalPhotoURL: ["", Validators.required],
      product1ID: ["", Validators.required],
      product2ID: ["", Validators.required],
      product3ID: ["", Validators.required],
      product4ID: ["", Validators.required]
    })
  }

  onSubmit(formValue) {
    this._http.post(`${environment['apiHost']}newsfeed_post/createNewsfeedPost`, formValue).subscribe((res) => {
      console.log(res)
      this.postForm.reset();
    }, (err) => {
      console.log(err)
    })
  }

}
