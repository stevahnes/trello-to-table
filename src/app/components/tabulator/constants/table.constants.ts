import { ICellRendererComp, ICellRendererFunc, ValueGetterParams } from 'ag-grid-community';
import { Card } from '../models/trello.model';
import { CsvLinkRendererComponent } from './renderer/csv-link-renderer.component';

export const FieldToHeaderName: {
  [key: string]: {
    headerName: string;
    width: number;
    cardKey: keyof Card | '';
    valueGetter?: ((params: ValueGetterParams) => string) | string;
    cellRenderer?: (new () => ICellRendererComp) | ICellRendererFunc | string;
  };
} = {
  number: { headerName: 'No.', width: 100, cardKey: '' },
  requester: {
    headerName: 'Requester [Team/Name]',
    width: 200,
    cardKey: 'labels'
  },
  pic: { headerName: 'PIC', width: 200, cardKey: 'idMembers' },
  project: { headerName: 'Project', width: 200, cardKey: 'name' },
  description: { headerName: 'Description', width: 300, cardKey: 'desc' },
  status: { headerName: 'Status', width: 100, cardKey: 'idList' },
  expectedLive: { headerName: 'Expected Live', width: 100, cardKey: 'due' },
  frf: {
    headerName: 'FRF',
    width: 100,
    cardKey: 'attachments',
    valueGetter: csvLinkValueGetter,
    cellRenderer: 'csvLinkRenderer'
  },
  prd: {
    headerName: 'PRD',
    width: 100,
    cardKey: 'attachments',
    valueGetter: csvLinkValueGetter,
    cellRenderer: 'csvLinkRenderer'
  },
  epic: {
    headerName: 'Epic',
    width: 100,
    cardKey: 'attachments',
    valueGetter: csvLinkValueGetter,
    cellRenderer: 'csvLinkRenderer'
  }
};

export const frameworkComponents = {
  csvLinkRenderer: CsvLinkRendererComponent
};

export const ExactDueDate: string[] = ['Developing', 'Testing', 'UAT', 'Staging', 'Done', 'Live'];

export const DesiredStatuses: string[] = [
  'Backlog',
  'Feasibility Studies',
  'PRD',
  'Technical Design',
  'Developing',
  'Testing',
  'UAT',
  'Staging',
  'Done',
  'Live'
];

function csvLinkValueGetter(params: ValueGetterParams): string {
  let returnString = '';
  const colId = params.column.getColId();
  const value = params.data[colId];
  if (value) {
    const [name, link]: string[] = (value as string).split(';');
    returnString = `=HYPERLINK("${link}","${name}")`;
  }
  return returnString;
}
