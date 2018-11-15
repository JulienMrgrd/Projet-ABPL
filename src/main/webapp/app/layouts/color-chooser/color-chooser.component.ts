import { Component } from '@angular/core';

@Component({
  selector: 'jhi-color-chooser',
  templateUrl: './color-chooser.component.html',
  styleUrls: ['color-chooser.css']
})
export class ColorChooserComponent {
  targetClass = 'black';

  colorInspirationClasses = [
    'white',
    'blue',
    'red',
    'yellow'
    // 'mint', 'aqua', 'bluejeans', 'lavender',
    // 'pinkrose', 'lightgray', 'mediumgray', 'darkgray'
  ];

  changeColor($index) {
    console.log($index);
    console.log(this.colorInspirationClasses[$index]);
    this.targetClass = this.colorInspirationClasses[$index];
    const bodyStyles = document.body.style;
    bodyStyles.setProperty('--abpl-primary', this.colorInspirationClasses[$index]);
  }
}
