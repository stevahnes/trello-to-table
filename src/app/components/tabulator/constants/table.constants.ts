import {
  ICellRendererComp,
  ICellRendererFunc,
  RowNode,
  ValueGetterParams
} from 'ag-grid-community';
import { Card } from '../models/trello.model';
import { CsvLinkRendererComponent } from './renderer/csv-link-renderer.component';
import dayjs from 'dayjs';

export const FieldToHeaderName: {
  [key: string]: {
    headerName: string;
    width: number;
    cardKey: keyof Card | '';
    comparator?: (
      valueA: any,
      valueB: any,
      nodeA: RowNode,
      nodeB: RowNode,
      isInverted: boolean
    ) => number;
    valueGetter?: ((params: ValueGetterParams) => string) | string;
    cellRenderer?: (new () => ICellRendererComp) | ICellRendererFunc | string;
  };
} = {
  number: { headerName: 'No.', width: 100, cardKey: '' },
  requester: {
    headerName: 'Requester',
    width: 200,
    cardKey: 'labels'
  },
  pic: { headerName: 'PIC', width: 200, cardKey: 'idMembers' },
  project: { headerName: 'Project', width: 200, cardKey: 'name' },
  description: { headerName: 'Description', width: 300, cardKey: 'desc' },
  status: { headerName: 'Status', width: 100, cardKey: 'idList' },
  expectedLive: {
    headerName: 'Expected Live',
    width: 100,
    cardKey: 'due',
    comparator: (valueA, valueB, _rowNodeA, _rowNodeB, _isInverted) => {
      const currentYear = dayjs().year();
      const endOfQuarters: { [key: string]: string } = {
        Q1: `31 Mar ${currentYear}`,
        Q2: `30 June ${currentYear}`,
        Q3: `30 Sep ${currentYear}`,
        Q4: `31 Dec ${currentYear}`
      };
      const parsedValueA = valueA
        ? valueA.match(/Q[1-4]/)
          ? dayjs(endOfQuarters[valueA])
          : dayjs(valueA, 'DD MMM YYYY')
        : dayjs(`31 Dec ${currentYear + 1}`, 'DD MMM YYYY');
      const parsedValueB = valueB
        ? valueB.match(/Q[1-4]/)
          ? dayjs(endOfQuarters[valueB])
          : dayjs(valueB, 'DD MMM YYYY')
        : dayjs(`31 Dec ${currentYear + 1}`, 'DD MMM YYYY');
      return parsedValueA === parsedValueB ? 0 : parsedValueA > parsedValueB ? 1 : -1;
    }
  },
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
