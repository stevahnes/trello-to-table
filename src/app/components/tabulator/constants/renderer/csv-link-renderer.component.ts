import { Component } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Nullable } from '../../models/trello.model';
import { replace } from 'lodash';

@Component({
  selector: 'app-csv-link-renderer',
  template: `
    <a href="{{ link }}">
      <span>{{ name }}</span>
    </a>
  `
})
export class CsvLinkRendererComponent implements AgRendererComponent {
  public link = '';
  public name = '';

  // gets called once before the renderer is used
  agInit(params: ICellRendererParams): void {
    if (params.value) {
      this.updateLinkAndName(params.value as string);
    }
  }

  // gets called whenever the cell refreshes
  refresh(params: ICellRendererParams): boolean {
    if (params.value) {
      this.updateLinkAndName(params.value as string);
    }
    return false;
  }

  updateLinkAndName(hyperlinkFunctionText: string): void {
    const linkAndName: Nullable<RegExpMatchArray> = hyperlinkFunctionText.match(/(".*")/);
    if (linkAndName) {
      const [link, name]: string[] = linkAndName[0].split(',');
      this.link = replace(link, /"/g, '');
      this.name = replace(name, /"/g, '');
    }
  }
}
