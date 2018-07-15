import { IConfigMapping } from './config-mapping.model';

export const enum ExpectResultType {
  OBJECT = 'OBJECT',
  ARRAY = 'ARRAY'
}

export interface IConfigGroup {
  id?: string;
  name?: string;
  host?: string;
  currentLevel?: number;
  expectResultType?: ExpectResultType;
  mappings?: IConfigMapping[];
}

export const defaultValue: Readonly<IConfigGroup> = {};
