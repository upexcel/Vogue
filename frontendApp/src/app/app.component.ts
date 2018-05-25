import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger,
  group,
  keyframes
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimation', [
      transition('1 => 2, 2 => 3', [
        style({ height: '!' }),
        query(':enter', style({ transform: 'translateX(100%)' })),
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
        // animate the leave page away
        group([
          query(':leave', [
            animate('.6s ease-in', keyframes([
              style({ opacity: 1, transform: 'translateX(0%)', offset: 0 }),
              style({ opacity: 0, transform: 'translateX(-100%)', offset: 1.0 }),
            ]))
          ]),
          // and now reveal the enter
          query(':enter',
            animate('.6s ease-in', keyframes([
              style({ opacity: 0, transform: 'translateX(100%)', offset: 0 }),
              style({ opacity: 1, transform: 'translateX(0%)', offset: 1 }),
            ]))
          ),
        ]),
      ]),
      transition('3 => 2, 2 => 1', [
        style({ height: '!' }),
        query(':enter', style({ transform: 'translateX(-100%)' })),
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
        // animate the leave page away
        group([
          query(':leave', [
            animate('.6s ease-in', keyframes([
              style({ opacity: 1, transform: 'translateX(0%)', offset: 0 }),
              style({ opacity: 0, transform: 'translateX(100%)', offset: 1 }),
            ]))
          ]),
          // and now reveal the enter
          query(':enter',
            animate('.6s ease-in', keyframes([
              style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
              style({ opacity: 1, transform: 'translateX(0%)', offset: 1 }),
            ]))
          ),
        ]),
      ]),
    ])
  ]
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  // getRouteAnimation(outlet) {
  //   return outlet.activatedRouteData.animation
  // }
  getDepth(outlet) {
    console.log(outlet.activatedRouteData['depth'])
    return outlet.activatedRouteData['depth'] || 1;
  }
}
