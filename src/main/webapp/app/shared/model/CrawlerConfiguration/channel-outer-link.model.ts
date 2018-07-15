export interface IChannelOuterLink {
  id?: string;
  configName?: string;
  selectorName?: string;
  selectorAttr?: string;
  host?: string;
  url?: string;
}

export const defaultValue: Readonly<IChannelOuterLink> = {};
