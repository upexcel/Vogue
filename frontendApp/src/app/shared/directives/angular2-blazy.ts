import { Directive, ElementRef, Input, AfterViewChecked, OnDestroy } from '@angular/core';
import * as Blazy from 'blazy';

/**
 * Directive to setup lazy image loading using bLazy.
 * Apply the directive on a container element that is a parent of `img` elements configured for bLazy.
 * The container element must have an ID and be scrollable (overflow: scroll).
 *
 * Sample usage:
 *
 * <div id="blazyContainer" [bLazyLoadImages]="someVariableThatChanges" [bLazyOffset]="300" style="overflow: scroll;">
 *     <div *ngFor="let image of images">
 *         <img class="b-lazy" src="placeholder.jpg" [attr.data-src]="image" />
 *     </div>
 * </div>
 *
 */
@Directive({
    selector: '[bLazyLoadImages]',
})
export class BlazyDirective implements OnDestroy {
    @Input() bLazyOffset = 200;
    bLazyInstance: any = null;

    constructor(private elementRef: ElementRef) { }

    ngOnDestroy() {
        this.destroyBlazy();
    }

    @Input() set bLazyLoadImages(value: any) {
        // deferred execution allows bLazy to properly initialize and bind itself.
        setTimeout(() => {
            this.destroyBlazy();
            this.setupBlazy();
        }, 100);
    }

    private setupBlazy() {
        if (this.bLazyInstance) {
            return;
        }

        const elementId = this.elementRef.nativeElement.id;
        console.log('elementId', elementId)
        if (!elementId) {
            throw Error('The element onto which the [bLazyLoadImages] directive is applied must have an id.');
        }
        console.log('this.elementRef.nativeElement', this.elementRef.nativeElement)
        this.bLazyInstance = new Blazy({
            container: '#' + elementId,
            root: this.elementRef.nativeElement,
            offset: this.bLazyOffset,
        });
    }

    private destroyBlazy() {
        if (this.bLazyInstance) {
            this.bLazyInstance.destroy();
            this.bLazyInstance = null;
        }
    }
}