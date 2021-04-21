import { ValueFormatterParams } from 'ag-grid-community';
import { Card } from '../models/trello.model';

export const FieldToHeaderName: {
  [key: string]: {
    headerName: string;
    width: number;
    cardKey: keyof Card | '';
    valueFormatter?: ((params: ValueFormatterParams) => string) | string;
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
  frf: { headerName: 'FRF', width: 100, cardKey: 'attachments', valueFormatter: csvLinkFormater },
  prd: { headerName: 'PRD', width: 100, cardKey: 'attachments', valueFormatter: csvLinkFormater },
  epic: { headerName: 'Epic', width: 100, cardKey: 'attachments', valueFormatter: csvLinkFormater }
};

export const ExactDueDate: string[] = ['Developing', 'Testing', 'UAT', 'Staging', 'Done', 'Live'];

function csvLinkFormater(params: ValueFormatterParams): string {
  let returnString = '';
  if (params.value) {
    const [name, link]: string[] = (params.value as string).split(';');
    returnString = `=HYPERLINK("${link}","${name}")`;
  }
  return returnString;
}
