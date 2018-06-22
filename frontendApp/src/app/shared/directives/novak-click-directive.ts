import { Directive, HostListener, OnInit, ElementRef, Input, Renderer } from '@angular/core';

// Directive decorator
@Directive({ selector: '[appNovakClick]' })
// Directive class
export class NovakClickDirective implements OnInit {
    constructor(
        public el: ElementRef,
        public render: Renderer
    ) { }

    ngOnInit() { }

    @HostListener('click', ['$event'])
    clickEvent(event) {
        event.preventDefault();
        if (event.target['localName'] === 'img') {
            this.render.setElementClass(event.target['parentNode'], 'novakbtn', true);
            this.render.setElementClass(event.target['parentNode'], 'novakbtn--effect-novak', true);
            this.render.setElementClass(event.target['parentNode'], 'novakbtn--click', true);
            setTimeout(() => {
                this.render.setElementClass(event.target['parentNode'], 'novakbtn', false);
                this.render.setElementClass(event.target['parentNode'], 'novakbtn--effect-novak', false);
                this.render.setElementClass(event.target['parentNode'], 'novakbtn--click', false);
            }, 500)
        } else {
            this.render.setElementClass(event.target, 'novakbtn', true);
            this.render.setElementClass(event.target, 'novakbtn--effect-novak', true);
            this.render.setElementClass(event.target, 'novakbtn--click', true);
            setTimeout(() => {
                this.render.setElementClass(event.target, 'novakbtn', false);
                this.render.setElementClass(event.target, 'novakbtn--effect-novak', false);
                this.render.setElementClass(event.target, 'novakbtn--click', false);
            }, 500)
        }
    }
}
