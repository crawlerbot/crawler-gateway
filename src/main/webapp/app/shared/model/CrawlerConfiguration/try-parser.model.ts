export const enum TryFetchEngine {
  HTTP = 'HTTP',
  SELENIUM = 'SELENIUM',
  RSS = 'RSS'
}

export const enum DocType {
  HTML = 'HTML',
  XML = 'XML',
  JSON = 'JSON'
}

export interface ITryParser {
  id?: string;
  url?: string;
  userAgent?: string;
  htmlContent?: any;
  parsedContent?: any;
  selector?: string;
  selectorResult?: any;
  fetchEngine?: TryFetchEngine;
  attributeSelector?: string;
  docType?: DocType;
}

export const defaultValue: Readonly<ITryParser> = {};
