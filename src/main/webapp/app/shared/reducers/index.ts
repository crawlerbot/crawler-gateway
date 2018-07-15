import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import configMapping, {
  ConfigMappingState
} from 'app/entities/CrawlerConfiguration/config-mapping/config-mapping.reducer';
// prettier-ignore
import channel, {
  ChannelState
} from 'app/entities/CrawlerConfiguration/channel/channel.reducer';
// prettier-ignore
import configGroup, {
  ConfigGroupState
} from 'app/entities/CrawlerConfiguration/config-group/config-group.reducer';
// prettier-ignore
import tryParser, {
  TryParserState
} from 'app/entities/CrawlerConfiguration/try-parser/try-parser.reducer';
// prettier-ignore
import siteChannel, {
  SiteChannelState
} from 'app/entities/CrawlerConfiguration/site-channel/site-channel.reducer';
// prettier-ignore
import channelOuterLink, {
  ChannelOuterLinkState
} from 'app/entities/CrawlerConfiguration/channel-outer-link/channel-outer-link.reducer';
/* simlife-needle-add-reducer-import - Simlife will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly configMapping: ConfigMappingState;
  readonly channel: ChannelState;
  readonly configGroup: ConfigGroupState;
  readonly tryParser: TryParserState;
  readonly siteChannel: SiteChannelState;
  readonly channelOuterLink: ChannelOuterLinkState;
  /* simlife-needle-add-reducer-type - Simlife will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  configMapping,
  channel,
  configGroup,
  tryParser,
  siteChannel,
  channelOuterLink,
  /* simlife-needle-add-reducer-combine - Simlife will add reducer here */
  loadingBar
});

export default rootReducer;
