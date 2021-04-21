export interface Member {
  id: string;
  idEnterprise: Nullable<string>;
  avatarHash: string;
  avatarUrl: string;
  bio: string;
  confirmed: boolean;
  fullName: string;
  initials: string;
  memberType: string;
  url: string;
  username: string;
}

export interface List {
  id: string;
  idBoard: string;
  closed: boolean;
  name: string;
  pos: number;
}

export interface Card {
  id: string;
  idBoard: string;
  idChecklists: string[];
  idLabels: string[];
  idList: string;
  idMembers: string[];
  idShort: number;
  isTemplate: boolean;
  labels: Label[];
  attachments: Attachment[];
  cover: Cover;
  dateLastActivity: string;
  due: Nullable<string>;
  desc: string;
  email: string;
  name: string;
  shortLink: string;
  shortUrl: string;
  url: string;
}

export interface Attachment {
  id: string;
  idMember: string;
  bytes: Nullable<string>;
  date: string;
  edgeColor: Nullable<string>;
  isUpload: boolean;
  mimeType: string;
  name: string;
  pos: number;
  url: string;
}

export interface Cover {
  brightness: string;
  color: string;
  idAttachment: Nullable<string>;
  idPlugin: Nullable<string>;
  size: string;
}

export interface Label {
  id: string;
  idBoard: string;
  color: string;
  name: string;
}

export type Nullable<T> = T | null;
