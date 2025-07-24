import { Directive, ElementRef, Renderer2, HostBinding, OnInit } from '@angular/core';

@Directive({
  selector: '[appScrollAppear]',
  standalone: true
})
export class ScrollAppearDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.renderer.addClass(this.el.nativeElement, 'enter-from-direction');
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(this.el.nativeElement);
  }
}
