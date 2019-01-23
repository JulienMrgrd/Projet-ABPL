import { Component, Input } from '@angular/core';
import { NgbModal, NgbPopover } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['color-picker.css']
})
export class ColorPickerComponent {
  @Input()
  modalMode = false;

  @Input()
  placement = 'top';

  @Input()
  mini = false;

  @Input()
  text: string;

  @Input()
  clickable = false;

  private opened = false;
  public defaultColor = '#316080';

  constructor(private modalService: NgbModal) {}

  changeColor(color) {
    const bodyStyles = document.body.style;
    bodyStyles.setProperty('--abpl-primary', color);

    const darkerColor = this.shadeColor(color, -30);
    bodyStyles.setProperty('--abpl-primary-darker', darkerColor);

    const lighterColor = this.shadeColor(color, 30);
    bodyStyles.setProperty('--abpl-primary-lighter', lighterColor);
  }

  /** https://stackoverflow.com/a/37600815 */
  shadeColor(color: string, percent: number) {
    let usePound = false;

    if (color[0] == '#') {
      color = color.slice(1);
      usePound = true;
    }

    let R = parseInt(color.substring(0, 2), 16);
    let G = parseInt(color.substring(2, 4), 16);
    let B = parseInt(color.substring(4, 6), 16);

    // to make the colour less bright than the input
    // change the following three "+" symbols to "-"
    R = R + percent;
    G = G + percent;
    B = B + percent;

    if (R > 255) R = 255;
    else if (R < 0) R = 0;

    if (G > 255) G = 255;
    else if (G < 0) G = 0;

    if (B > 255) B = 255;
    else if (B < 0) B = 0;

    const RR = R.toString(16).length == 1 ? '0' + R.toString(16) : R.toString(16);
    const GG = G.toString(16).length == 1 ? '0' + G.toString(16) : G.toString(16);
    const BB = B.toString(16).length == 1 ? '0' + B.toString(16) : B.toString(16);

    return (usePound ? '#' : '') + RR + GG + BB;
  }

  public open(content): void {
    this.opened = true;

    this.modalService.open(content, { size: 'sm', centered: true }).result.then(
      () => {
        this.opened = false;
      },
      () => {
        this.opened = false;
      }
    );
  }

  popIfClickable(p: NgbPopover) {
    if (this.clickable) {
      p.open();
    }
  }
}
