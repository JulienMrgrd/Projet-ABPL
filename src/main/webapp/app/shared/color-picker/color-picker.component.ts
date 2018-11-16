import { Component } from '@angular/core';

@Component({
  selector: 'jhi-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['color-picker.css']
})
export class ColorPickerComponent {
  public defaultColor = '#4682B4';

  changeColor(color) {
    const bodyStyles = document.body.style;
    bodyStyles.setProperty('--abpl-primary', color);

    const darkerColor = this.shadeColor(color, -50);
    bodyStyles.setProperty('--abpl-primary-darker', darkerColor);

    const lighterColor = this.shadeColor(color, 50);
    bodyStyles.setProperty('--abpl-primary-lighter', lighterColor);

    const borderDarkerColor = this.shadeColor(color, -20);
    bodyStyles.setProperty('--abpl-primary-border', borderDarkerColor);
  }

  shadeColor(color: string, percent: number) {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    R = parseInt(((R * (100 + percent)) / 100).toString(), 16);
    G = parseInt(((G * (100 + percent)) / 100).toString(), 16);
    B = parseInt(((B * (100 + percent)) / 100).toString(), 16);

    R = R < 255 ? R : 255;
    G = G < 255 ? G : 255;
    B = B < 255 ? B : 255;

    const RR = R.toString(16).length === 1 ? '0' + R.toString(16) : R.toString(16);
    const GG = G.toString(16).length === 1 ? '0' + G.toString(16) : G.toString(16);
    const BB = B.toString(16).length === 1 ? '0' + B.toString(16) : B.toString(16);

    return '#' + RR + GG + BB;
  }
}
