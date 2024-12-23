export type Field = {
  value: string;
  format: string;
};

export type Paragraph = {
  entity_bundle: { value: string }[];
  id: { value: number }[];
  [key: string]: any;
};

export type RestResponseData = {
  [key: string]: any;
};

export type ImageField = {
  uri: string;
  title: string;
};

export type LinkField = {
  uri: string;
  title: string;
};