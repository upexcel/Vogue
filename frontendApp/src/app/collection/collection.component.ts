import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../shared/api-service/api-service';
import * as _ from 'lodash';
import { LocalStorageService } from '../shared/commom/local-storage.service';


@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit, OnDestroy {
  productData: any;
  selectedProduct: any = []
  constructor(public activatedRoute: ActivatedRoute, public apiService: ApiService, public localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.getProduct(this.activatedRoute.snapshot.paramMap.get('id'))

    if (this.localStorageService.get('selectedProduct')) {
      this.selectedProduct = this.localStorageService.get('selectedProduct');
      console.log(this.selectedProduct);

    }
  }

  getProduct(id) {
    this.apiService.getProduct(id).subscribe((res) => {
      this.productData = res['data'];
    }, (err) => {
      console.log(err);
    })
  }

  addProduct(item) {
    if (_.findIndex(this.selectedProduct, item) === -1) {
      if (this.selectedProduct.length < 4) {
        this.selectedProduct.push(item);
      } else {
        alert('Maximum Number of Product Added')
      }
    } else {
      alert('Already Added')
    }
  }

  removeProduct(item) {
    console.log(item);
    _.remove(this.selectedProduct, item);
  }

  ngOnDestroy() {
    this.localStorageService.set('selectedProduct', this.selectedProduct)
  }

}
