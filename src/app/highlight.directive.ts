import { Directive, Input, SimpleChanges, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})

export class HighlightDirective {
  //takes string to search and text on which to search
  @Input() searchedWords: string[];
  @Input() text: string;
  @Input() classToApply: string;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    //if search found renders to innerhtml
    if (!this.searchedWords || !this.searchedWords.length || !this.classToApply) {
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.text);
      return;
    }

    this.renderer.setProperty(
      this.el.nativeElement,
      'innerHTML',
      this.getFormattedText()
    );
  }

  getFormattedText() {
    //checks case and match using regular expression
    const re = new RegExp(`(${ this.searchedWords.join('|') })`, 'g');
    //adds span for found text and apply calss on it
    return this.text.replace(re, `<span class="${this.classToApply}">$1</span>`);
  }
}
