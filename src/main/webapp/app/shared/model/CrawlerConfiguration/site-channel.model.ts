import { IChannelOuterLink } from './channel-outer-link.model';
import { IConfigMapping } from './config-mapping.model';
import { IConfigGroup } from './config-group.model';

export const enum DocType {
  HTML = 'HTML',
  XML = 'XML',
  JSON = 'JSON'
}

export const enum FetchEngine {
  SELENIUM = 'SELENIUM',
  HTTP = 'HTTP',
  RSS = 'RSS'
}

export const enum PostType {
  ARTICLE = 'ARTICLE',
  VIDEO = 'VIDEO',
  MUSIC = 'MUSIC',
  MOVIE = 'MOVIE',
  NEWS = 'NEWS',
  AUDIO = 'AUDIO'
}

export const enum ChannelType {
  CHANNEL_FOR_GETTING_CHANNEL = 'CHANNEL_FOR_GETTING_CHANNEL',
  CHANNEL_FOR_GETTING_FEED = 'CHANNEL_FOR_GETTING_FEED'
}

export const enum TargetChannel {
  PUBLISHER = 'PUBLISHER',
  CATEGORY = 'CATEGORY'
}

export interface ISiteChannel {
  id?: string;
  url?: string;
  contentType?: DocType;
  schedule?: string;
  scheduleTimeZone?: string;
  totalLevel?: number;
  archiveLevel?: number;
  unlimitedLevel?: boolean;
  fetchEngine?: FetchEngine;
  category?: string;
  tag?: string;
  categorySlug?: string;
  tagSlug?: string;
  countryCode?: string;
  languageCode?: string;
  targetQueueChannel?: string;
  topics?: string;
  topicSlugs?: string;
  postType?: PostType;
  rankingCountry?: number;
  channelTotalLevel?: number;
  channelArchiveLevel?: number;
  channelFetchEngine?: FetchEngine;
  channelRanking?: number;
  channelTargetQueue?: string;
  channelTargetPostType?: PostType;
  channelLevelOneFetchEngine?: FetchEngine;
  channelLevelTwoFetchEngine?: FetchEngine;
  channelLevelThreeFetchEngine?: FetchEngine;
  channelLevelFourFetchEngine?: FetchEngine;
  channelLevelOneContentType?: DocType;
  channelLevelTwoContentType?: DocType;
  channelLevelThreeContentType?: DocType;
  channelLevelFourContentType?: DocType;
  channelAllowExternalUrl?: boolean;
  channelLogo?: string;
  channelSiteName?: string;
  logo?: string;
  siteName?: string;
  channelType?: ChannelType;
  levelOneFetchEngine?: FetchEngine;
  levelTwoFetchEngine?: FetchEngine;
  levelThreeFetchEngine?: FetchEngine;
  levelFourFetchEngine?: FetchEngine;
  levelOneContentType?: DocType;
  levelTwoContentType?: DocType;
  levelThreeContentType?: DocType;
  levelFourContentType?: DocType;
  allowExternalUrl?: boolean;
  siteUrl?: string;
  targetChannel?: TargetChannel;
  target?: TargetChannel;
  siteDomain?: string;
  outers?: IChannelOuterLink[];
  mappings?: IConfigMapping[];
  configGroups?: IConfigGroup[];
  targetGroups?: IConfigGroup[];
}

export const defaultValue: Readonly<ISiteChannel> = {
  unlimitedLevel: false,
  channelAllowExternalUrl: false,
  allowExternalUrl: false
};
