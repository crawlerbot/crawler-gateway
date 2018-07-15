export const enum ConfigDataType {
  INTEGER = 'INTEGER',
  STRING = 'STRING',
  DOUBLE = 'DOUBLE',
  FLOAT = 'FLOAT',
  DATE = 'DATE'
}

export interface IConfigMapping {
  id?: string;
  name?: string;
  selector?: string;
  host?: string;
  configName?: string;
  attr?: string;
  dataType?: ConfigDataType;
}

export const defaultValue: Readonly<IConfigMapping> = {};
