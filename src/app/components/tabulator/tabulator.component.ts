import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { filter, find } from 'lodash';
import { FieldToHeaderName } from './constants/table.constants';
import { Card, Member, List, Nullable } from './models/trello.model';

@Component({
  selector: 'app-tabulator',
  templateUrl: './tabulator.component.html',
  styleUrls: ['./tabulator.component.scss']
})
export class TabulatorComponent implements OnInit {
  constructor() {}

  public uploadedFileName = '';
  public processingFile = false;
  public parseError = false;
  public displayDataTabulator = false;

  public defaultColDef: Partial<ColDef> = {
    sortable: true,
    filter: true,
    resizable: true
  };
  public columnDefs: Partial<ColDef>[] = [];
  public rowData: any[] = [];
  private api: Nullable<GridApi> = null;

  private members: Member[] = [];
  private lists: List[] = [];
  private cards: Card[] = [];

  ngOnInit(): void {
    for (const field of Object.keys(FieldToHeaderName)) {
      this.columnDefs.push({
        field,
        headerName: FieldToHeaderName[field].headerName,
        width: FieldToHeaderName[field].width
      });
    }
  }

  onFileDropped(event: File): void {
    this.processFile(event);
  }

  onFileAdded(event: Event): void {
    if (event.target) {
      const fileInputElement: HTMLInputElement = event.target as HTMLInputElement;
      if (fileInputElement.files) {
        const file: File = fileInputElement.files[0];
        this.processFile(file);
      }
    }
  }

  onGridReady(params: GridReadyEvent): void {
    this.api = params.api;
  }

  setDisplayDataTabulator(value: boolean): void {
    this.displayDataTabulator = value;
  }

  exportAsCsv(): void {
    if (this.api) {
      this.api.exportDataAsCsv();
    }
  }

  private processFile(file: File): void {
    this.parseError = false;
    this.processingFile = true;
    this.uploadedFileName = file.name;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const fileContent: string = fileReader.result as string;
      if (fileContent) {
        this.parseFileContent(fileContent);
      }
    };
    fileReader.readAsText(file);
  }

  private parseFileContent(fileContent: string): void {
    try {
      const content = JSON.parse(fileContent);
      if (content) {
        this.members = content.members;
        this.lists = content.lists;
        this.cards = content.cards;
        this.updateRowData(this.members, this.lists, this.cards);
      }
      this.displayDataTabulator = true;
      this.processingFile = false;
    } catch (error) {
      this.parseError = true;
    }
  }

  private updateRowData(members: Member[], lists: List[], cards: Card[]): void {
    for (const [index, card] of cards.entries()) {
      const rowData: any = {};
      for (const field in FieldToHeaderName) {
        if (FieldToHeaderName[field].cardKey) {
          const key = FieldToHeaderName[field].cardKey;
          if (key.includes('id')) {
            switch (key) {
              case 'idList':
                const list: List | undefined = find(lists, ['id', card[key as keyof Card]]);
                rowData[field] = list ? list.name : '';
                break;
              case 'idMembers':
                const idMembers: string[] = card[key as keyof Card] as string[];
                const filteredMembers: string[] = filter(members, (member) =>
                  idMembers.includes(member.id)
                ).map((member) => member.fullName);
                rowData[field] = filteredMembers.length > 0 ? filteredMembers.join(' | ') : '';
                break;
              default:
                break;
            }
          } else if (key.includes('attachments')) {
          } else {
            rowData[field] = card[key as keyof Card];
          }
        } else {
          if (field === 'number') {
            rowData[field] = index + 1;
          } else {
            rowData[field] = '';
          }
        }
      }
      this.rowData.push(rowData);
    }
  }
}