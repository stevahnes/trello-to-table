import { Card } from '../models/trello.model';

export const FieldToHeaderName: {
  [key: string]: { headerName: string; width: number; cardKey: keyof Card | '' };
} = {
  number: { headerName: 'No.', width: 100, cardKey: '' },
  requester: { headerName: 'Requester [Team/Name]', width: 200, cardKey: '' },
  pic: { headerName: 'PIC', width: 200, cardKey: 'idMembers' },
  project: { headerName: 'Project', width: 200, cardKey: 'name' },
  description: { headerName: 'Description', width: 300, cardKey: 'desc' },
  status: { headerName: 'Status', width: 100, cardKey: 'idList' },
  expectedLive: { headerName: 'Expected Live', width: 100, cardKey: '' },
  jiraLink: { headerName: 'Jira Link', width: 100, cardKey: 'attachments' },
  document: { headerName: 'Document', width: 100, cardKey: 'attachments' }
};
