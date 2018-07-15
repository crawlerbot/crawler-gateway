import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-simlife';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IChannelOuterLink } from 'app/shared/model/CrawlerConfiguration/channel-outer-link.model';
import { getEntities as getChannelOuterLinks } from 'app/entities/CrawlerConfiguration/channel-outer-link/channel-outer-link.reducer';
import { IConfigMapping } from 'app/shared/model/CrawlerConfiguration/config-mapping.model';
import { getEntities as getConfigMappings } from 'app/entities/CrawlerConfiguration/config-mapping/config-mapping.reducer';
import { IConfigGroup } from 'app/shared/model/CrawlerConfiguration/config-group.model';
import { getEntities as getConfigGroups } from 'app/entities/CrawlerConfiguration/config-group/config-group.reducer';
import { getEntity, updateEntity, createEntity, reset } from './channel.reducer';
import { IChannel } from 'app/shared/model/CrawlerConfiguration/channel.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IChannelUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IChannelUpdateState {
  isNew: boolean;
  idsouter: any[];
  idsmapping: any[];
  idsconfigGroup: any[];
  idstargetGroup: any[];
}

export class ChannelUpdate extends React.Component<IChannelUpdateProps, IChannelUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsouter: [],
      idsmapping: [],
      idsconfigGroup: [],
      idstargetGroup: [],
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getChannelOuterLinks();
    this.props.getConfigMappings();
    this.props.getConfigGroups();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { channelEntity } = this.props;
      const entity = {
        ...channelEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/channel');
  };

  outerUpdate = element => {
    const selected = Array.from(element.target.selectedOptions).map((e: any) => e.value);
    this.setState({
      idsouter: keysToValues(selected, this.props.channelOuterLinks, 'configName')
    });
  };

  mappingUpdate = element => {
    const selected = Array.from(element.target.selectedOptions).map((e: any) => e.value);
    this.setState({
      idsmapping: keysToValues(selected, this.props.configMappings, 'name')
    });
  };

  configGroupUpdate = element => {
    const selected = Array.from(element.target.selectedOptions).map((e: any) => e.value);
    this.setState({
      idsconfigGroup: keysToValues(selected, this.props.configGroups, 'name')
    });
  };

  targetGroupUpdate = element => {
    const selected = Array.from(element.target.selectedOptions).map((e: any) => e.value);
    this.setState({
      idstargetGroup: keysToValues(selected, this.props.configGroups, 'name')
    });
  };

  displayouter(value: any) {
    if (this.state.idsouter && this.state.idsouter.length !== 0) {
      const list = [];
      for (const i in this.state.idsouter) {
        if (this.state.idsouter[i]) {
          list.push(this.state.idsouter[i].configName);
        }
      }
      return list;
    }
    if (value.outers && value.outers.length !== 0) {
      const list = [];
      for (const i in value.outers) {
        if (value.outers[i]) {
          list.push(value.outers[i].configName);
        }
      }
      this.setState({
        idsouter: keysToValues(list, this.props.channelOuterLinks, 'configName')
      });
      return list;
    }
    return null;
  }

  displaymapping(value: any) {
    if (this.state.idsmapping && this.state.idsmapping.length !== 0) {
      const list = [];
      for (const i in this.state.idsmapping) {
        if (this.state.idsmapping[i]) {
          list.push(this.state.idsmapping[i].name);
        }
      }
      return list;
    }
    if (value.mappings && value.mappings.length !== 0) {
      const list = [];
      for (const i in value.mappings) {
        if (value.mappings[i]) {
          list.push(value.mappings[i].name);
        }
      }
      this.setState({
        idsmapping: keysToValues(list, this.props.configMappings, 'name')
      });
      return list;
    }
    return null;
  }

  displayconfigGroup(value: any) {
    if (this.state.idsconfigGroup && this.state.idsconfigGroup.length !== 0) {
      const list = [];
      for (const i in this.state.idsconfigGroup) {
        if (this.state.idsconfigGroup[i]) {
          list.push(this.state.idsconfigGroup[i].name);
        }
      }
      return list;
    }
    if (value.configGroups && value.configGroups.length !== 0) {
      const list = [];
      for (const i in value.configGroups) {
        if (value.configGroups[i]) {
          list.push(value.configGroups[i].name);
        }
      }
      this.setState({
        idsconfigGroup: keysToValues(list, this.props.configGroups, 'name')
      });
      return list;
    }
    return null;
  }

  displaytargetGroup(value: any) {
    if (this.state.idstargetGroup && this.state.idstargetGroup.length !== 0) {
      const list = [];
      for (const i in this.state.idstargetGroup) {
        if (this.state.idstargetGroup[i]) {
          list.push(this.state.idstargetGroup[i].name);
        }
      }
      return list;
    }
    if (value.targetGroups && value.targetGroups.length !== 0) {
      const list = [];
      for (const i in value.targetGroups) {
        if (value.targetGroups[i]) {
          list.push(value.targetGroups[i].name);
        }
      }
      this.setState({
        idstargetGroup: keysToValues(list, this.props.configGroups, 'name')
      });
      return list;
    }
    return null;
  }

  render() {
    const isInvalid = false;
    const { channelEntity, channelOuterLinks, configMappings, configGroups, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="crawlerEngineApp.crawlerConfigurationChannel.home.createOrEditLabel">
              <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.home.createOrEditLabel">
                Create or edit a Channel
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : channelEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="channel-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="urlLabel" for="url">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.url">Url</Translate>
                  </Label>
                  <AvField id="channel-url" type="text" name="url" />
                </AvGroup>
                <AvGroup>
                  <Label id="contentTypeLabel">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.contentType">Content Type</Translate>
                  </Label>
                  <AvInput
                    id="channel-contentType"
                    type="select"
                    className="form-control"
                    name="contentType"
                    value={(!isNew && channelEntity.contentType) || 'HTML'}
                  >
                    <option value="HTML">HTML</option>
                    <option value="XML">XML</option>
                    <option value="JSON">JSON</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="scheduleLabel" for="schedule">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.schedule">Schedule</Translate>
                  </Label>
                  <AvField id="channel-schedule" type="text" name="schedule" />
                </AvGroup>
                <AvGroup>
                  <Label id="scheduleTimeZoneLabel" for="scheduleTimeZone">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.scheduleTimeZone">Schedule Time Zone</Translate>
                  </Label>
                  <AvField id="channel-scheduleTimeZone" type="text" name="scheduleTimeZone" />
                </AvGroup>
                <AvGroup>
                  <Label id="totalLevelLabel" for="totalLevel">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.totalLevel">Total Level</Translate>
                  </Label>
                  <AvField id="channel-totalLevel" type="number" className="form-control" name="totalLevel" />
                </AvGroup>
                <AvGroup>
                  <Label id="archiveLevelLabel" for="archiveLevel">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.archiveLevel">Archive Level</Translate>
                  </Label>
                  <AvField id="channel-archiveLevel" type="number" className="form-control" name="archiveLevel" />
                </AvGroup>
                <AvGroup>
                  <Label id="unlimitedLevelLabel" check>
                    <AvInput id="channel-unlimitedLevel" type="checkbox" className="form-control" name="unlimitedLevel" />
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.unlimitedLevel">Unlimited Level</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="fetchEngineLabel">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.fetchEngine">Fetch Engine</Translate>
                  </Label>
                  <AvInput
                    id="channel-fetchEngine"
                    type="select"
                    className="form-control"
                    name="fetchEngine"
                    value={(!isNew && channelEntity.fetchEngine) || 'SELENIUM'}
                  >
                    <option value="SELENIUM">SELENIUM</option>
                    <option value="HTTP">HTTP</option>
                    <option value="RSS">RSS</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="categoryLabel" for="category">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.category">Category</Translate>
                  </Label>
                  <AvField id="channel-category" type="text" name="category" />
                </AvGroup>
                <AvGroup>
                  <Label id="tagLabel" for="tag">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.tag">Tag</Translate>
                  </Label>
                  <AvField id="channel-tag" type="text" name="tag" />
                </AvGroup>
                <AvGroup>
                  <Label id="categorySlugLabel" for="categorySlug">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.categorySlug">Category Slug</Translate>
                  </Label>
                  <AvField id="channel-categorySlug" type="text" name="categorySlug" />
                </AvGroup>
                <AvGroup>
                  <Label id="tagSlugLabel" for="tagSlug">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.tagSlug">Tag Slug</Translate>
                  </Label>
                  <AvField id="channel-tagSlug" type="text" name="tagSlug" />
                </AvGroup>
                <AvGroup>
                  <Label id="countryCodeLabel" for="countryCode">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.countryCode">Country Code</Translate>
                  </Label>
                  <AvField id="channel-countryCode" type="text" name="countryCode" />
                </AvGroup>
                <AvGroup>
                  <Label id="languageCodeLabel" for="languageCode">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.languageCode">Language Code</Translate>
                  </Label>
                  <AvField id="channel-languageCode" type="text" name="languageCode" />
                </AvGroup>
                <AvGroup>
                  <Label id="targetQueueChannelLabel" for="targetQueueChannel">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.targetQueueChannel">Target Queue Channel</Translate>
                  </Label>
                  <AvField id="channel-targetQueueChannel" type="text" name="targetQueueChannel" />
                </AvGroup>
                <AvGroup>
                  <Label id="topicsLabel" for="topics">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.topics">Topics</Translate>
                  </Label>
                  <AvField id="channel-topics" type="text" name="topics" />
                </AvGroup>
                <AvGroup>
                  <Label id="topicSlugsLabel" for="topicSlugs">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.topicSlugs">Topic Slugs</Translate>
                  </Label>
                  <AvField id="channel-topicSlugs" type="text" name="topicSlugs" />
                </AvGroup>
                <AvGroup>
                  <Label id="postTypeLabel">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.postType">Post Type</Translate>
                  </Label>
                  <AvInput
                    id="channel-postType"
                    type="select"
                    className="form-control"
                    name="postType"
                    value={(!isNew && channelEntity.postType) || 'ARTICLE'}
                  >
                    <option value="ARTICLE">ARTICLE</option>
                    <option value="VIDEO">VIDEO</option>
                    <option value="MUSIC">MUSIC</option>
                    <option value="MOVIE">MOVIE</option>
                    <option value="NEWS">NEWS</option>
                    <option value="AUDIO">AUDIO</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="rankingCountryLabel" for="rankingCountry">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.rankingCountry">Ranking Country</Translate>
                  </Label>
                  <AvField id="channel-rankingCountry" type="number" className="form-control" name="rankingCountry" />
                </AvGroup>
                <AvGroup>
                  <Label id="channelTotalLevelLabel" for="channelTotalLevel">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.channelTotalLevel">Channel Total Level</Translate>
                  </Label>
                  <AvField id="channel-channelTotalLevel" type="number" className="form-control" name="channelTotalLevel" />
                </AvGroup>
                <AvGroup>
                  <Label id="channelArchiveLevelLabel" for="channelArchiveLevel">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.channelArchiveLevel">
                      Channel Archive Level
                    </Translate>
                  </Label>
                  <AvField id="channel-channelArchiveLevel" type="number" className="form-control" name="channelArchiveLevel" />
                </AvGroup>
                <AvGroup>
                  <Label id="channelFetchEngineLabel">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.channelFetchEngine">Channel Fetch Engine</Translate>
                  </Label>
                  <AvInput
                    id="channel-channelFetchEngine"
                    type="select"
                    className="form-control"
                    name="channelFetchEngine"
                    value={(!isNew && channelEntity.channelFetchEngine) || 'SELENIUM'}
                  >
                    <option value="SELENIUM">SELENIUM</option>
                    <option value="HTTP">HTTP</option>
                    <option value="RSS">RSS</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="channelRankingLabel" for="channelRanking">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.channelRanking">Channel Ranking</Translate>
                  </Label>
                  <AvField id="channel-channelRanking" type="number" className="form-control" name="channelRanking" />
                </AvGroup>
                <AvGroup>
                  <Label id="channelTargetQueueLabel" for="channelTargetQueue">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.channelTargetQueue">Channel Target Queue</Translate>
                  </Label>
                  <AvField id="channel-channelTargetQueue" type="text" name="channelTargetQueue" />
                </AvGroup>
                <AvGroup>
                  <Label id="channelTargetPostTypeLabel">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.channelTargetPostType">
                      Channel Target Post Type
                    </Translate>
                  </Label>
                  <AvInput
                    id="channel-channelTargetPostType"
                    type="select"
                    className="form-control"
                    name="channelTargetPostType"
                    value={(!isNew && channelEntity.channelTargetPostType) || 'ARTICLE'}
                  >
                    <option value="ARTICLE">ARTICLE</option>
                    <option value="VIDEO">VIDEO</option>
                    <option value="MUSIC">MUSIC</option>
                    <option value="MOVIE">MOVIE</option>
                    <option value="NEWS">NEWS</option>
                    <option value="AUDIO">AUDIO</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="channelLevelOneFetchEngineLabel">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.channelLevelOneFetchEngine">
                      Channel Level One Fetch Engine
                    </Translate>
                  </Label>
                  <AvInput
                    id="channel-channelLevelOneFetchEngine"
                    type="select"
                    className="form-control"
                    name="channelLevelOneFetchEngine"
                    value={(!isNew && channelEntity.channelLevelOneFetchEngine) || 'SELENIUM'}
                  >
                    <option value="SELENIUM">SELENIUM</option>
                    <option value="HTTP">HTTP</option>
                    <option value="RSS">RSS</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="channelLevelTwoFetchEngineLabel">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.channelLevelTwoFetchEngine">
                      Channel Level Two Fetch Engine
                    </Translate>
                  </Label>
                  <AvInput
                    id="channel-channelLevelTwoFetchEngine"
                    type="select"
                    className="form-control"
                    name="channelLevelTwoFetchEngine"
                    value={(!isNew && channelEntity.channelLevelTwoFetchEngine) || 'SELENIUM'}
                  >
                    <option value="SELENIUM">SELENIUM</option>
                    <option value="HTTP">HTTP</option>
                    <option value="RSS">RSS</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="channelLevelThreeFetchEngineLabel">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.channelLevelThreeFetchEngine">
                      Channel Level Three Fetch Engine
                    </Translate>
                  </Label>
                  <AvInput
                    id="channel-channelLevelThreeFetchEngine"
                    type="select"
                    className="form-control"
                    name="channelLevelThreeFetchEngine"
                    value={(!isNew && channelEntity.channelLevelThreeFetchEngine) || 'SELENIUM'}
                  >
                    <option value="SELENIUM">SELENIUM</option>
                    <option value="HTTP">HTTP</option>
                    <option value="RSS">RSS</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="channelLevelFourFetchEngineLabel">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.channelLevelFourFetchEngine">
                      Channel Level Four Fetch Engine
                    </Translate>
                  </Label>
                  <AvInput
                    id="channel-channelLevelFourFetchEngine"
                    type="select"
                    className="form-control"
                    name="channelLevelFourFetchEngine"
                    value={(!isNew && channelEntity.channelLevelFourFetchEngine) || 'SELENIUM'}
                  >
                    <option value="SELENIUM">SELENIUM</option>
                    <option value="HTTP">HTTP</option>
                    <option value="RSS">RSS</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="channelLevelOneContentTypeLabel">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.channelLevelOneContentType">
                      Channel Level One Content Type
                    </Translate>
                  </Label>
                  <AvInput
                    id="channel-channelLevelOneContentType"
                    type="select"
                    className="form-control"
                    name="channelLevelOneContentType"
                    value={(!isNew && channelEntity.channelLevelOneContentType) || 'HTML'}
                  >
                    <option value="HTML">HTML</option>
                    <option value="XML">XML</option>
                    <option value="JSON">JSON</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="channelLevelTwoContentTypeLabel">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.channelLevelTwoContentType">
                      Channel Level Two Content Type
                    </Translate>
                  </Label>
                  <AvInput
                    id="channel-channelLevelTwoContentType"
                    type="select"
                    className="form-control"
                    name="channelLevelTwoContentType"
                    value={(!isNew && channelEntity.channelLevelTwoContentType) || 'HTML'}
                  >
                    <option value="HTML">HTML</option>
                    <option value="XML">XML</option>
                    <option value="JSON">JSON</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="channelLevelThreeContentTypeLabel">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.channelLevelThreeContentType">
                      Channel Level Three Content Type
                    </Translate>
                  </Label>
                  <AvInput
                    id="channel-channelLevelThreeContentType"
                    type="select"
                    className="form-control"
                    name="channelLevelThreeContentType"
                    value={(!isNew && channelEntity.channelLevelThreeContentType) || 'HTML'}
                  >
                    <option value="HTML">HTML</option>
                    <option value="XML">XML</option>
                    <option value="JSON">JSON</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="channelLevelFourContentTypeLabel">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.channelLevelFourContentType">
                      Channel Level Four Content Type
                    </Translate>
                  </Label>
                  <AvInput
                    id="channel-channelLevelFourContentType"
                    type="select"
                    className="form-control"
                    name="channelLevelFourContentType"
                    value={(!isNew && channelEntity.channelLevelFourContentType) || 'HTML'}
                  >
                    <option value="HTML">HTML</option>
                    <option value="XML">XML</option>
                    <option value="JSON">JSON</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="channelAllowExternalUrlLabel" check>
                    <AvInput id="channel-channelAllowExternalUrl" type="checkbox" className="form-control" name="channelAllowExternalUrl" />
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.channelAllowExternalUrl">
                      Channel Allow External Url
                    </Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="channelLogoLabel" for="channelLogo">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.channelLogo">Channel Logo</Translate>
                  </Label>
                  <AvField id="channel-channelLogo" type="text" name="channelLogo" />
                </AvGroup>
                <AvGroup>
                  <Label id="channelSiteNameLabel" for="channelSiteName">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.channelSiteName">Channel Site Name</Translate>
                  </Label>
                  <AvField id="channel-channelSiteName" type="text" name="channelSiteName" />
                </AvGroup>
                <AvGroup>
                  <Label id="logoLabel" for="logo">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.logo">Logo</Translate>
                  </Label>
                  <AvField id="channel-logo" type="text" name="logo" />
                </AvGroup>
                <AvGroup>
                  <Label id="siteNameLabel" for="siteName">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.siteName">Site Name</Translate>
                  </Label>
                  <AvField id="channel-siteName" type="text" name="siteName" />
                </AvGroup>
                <AvGroup>
                  <Label id="channelTypeLabel">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.channelType">Channel Type</Translate>
                  </Label>
                  <AvInput
                    id="channel-channelType"
                    type="select"
                    className="form-control"
                    name="channelType"
                    value={(!isNew && channelEntity.channelType) || 'CHANNEL_FOR_GETTING_CHANNEL'}
                  >
                    <option value="CHANNEL_FOR_GETTING_CHANNEL">CHANNEL_FOR_GETTING_CHANNEL</option>
                    <option value="CHANNEL_FOR_GETTING_FEED">CHANNEL_FOR_GETTING_FEED</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="levelOneFetchEngineLabel">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.levelOneFetchEngine">
                      Level One Fetch Engine
                    </Translate>
                  </Label>
                  <AvInput
                    id="channel-levelOneFetchEngine"
                    type="select"
                    className="form-control"
                    name="levelOneFetchEngine"
                    value={(!isNew && channelEntity.levelOneFetchEngine) || 'SELENIUM'}
                  >
                    <option value="SELENIUM">SELENIUM</option>
                    <option value="HTTP">HTTP</option>
                    <option value="RSS">RSS</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="levelTwoFetchEngineLabel">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.levelTwoFetchEngine">
                      Level Two Fetch Engine
                    </Translate>
                  </Label>
                  <AvInput
                    id="channel-levelTwoFetchEngine"
                    type="select"
                    className="form-control"
                    name="levelTwoFetchEngine"
                    value={(!isNew && channelEntity.levelTwoFetchEngine) || 'SELENIUM'}
                  >
                    <option value="SELENIUM">SELENIUM</option>
                    <option value="HTTP">HTTP</option>
                    <option value="RSS">RSS</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="levelThreeFetchEngineLabel">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.levelThreeFetchEngine">
                      Level Three Fetch Engine
                    </Translate>
                  </Label>
                  <AvInput
                    id="channel-levelThreeFetchEngine"
                    type="select"
                    className="form-control"
                    name="levelThreeFetchEngine"
                    value={(!isNew && channelEntity.levelThreeFetchEngine) || 'SELENIUM'}
                  >
                    <option value="SELENIUM">SELENIUM</option>
                    <option value="HTTP">HTTP</option>
                    <option value="RSS">RSS</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="levelFourFetchEngineLabel">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.levelFourFetchEngine">
                      Level Four Fetch Engine
                    </Translate>
                  </Label>
                  <AvInput
                    id="channel-levelFourFetchEngine"
                    type="select"
                    className="form-control"
                    name="levelFourFetchEngine"
                    value={(!isNew && channelEntity.levelFourFetchEngine) || 'SELENIUM'}
                  >
                    <option value="SELENIUM">SELENIUM</option>
                    <option value="HTTP">HTTP</option>
                    <option value="RSS">RSS</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="levelOneContentTypeLabel">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.levelOneContentType">
                      Level One Content Type
                    </Translate>
                  </Label>
                  <AvInput
                    id="channel-levelOneContentType"
                    type="select"
                    className="form-control"
                    name="levelOneContentType"
                    value={(!isNew && channelEntity.levelOneContentType) || 'HTML'}
                  >
                    <option value="HTML">HTML</option>
                    <option value="XML">XML</option>
                    <option value="JSON">JSON</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="levelTwoContentTypeLabel">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.levelTwoContentType">
                      Level Two Content Type
                    </Translate>
                  </Label>
                  <AvInput
                    id="channel-levelTwoContentType"
                    type="select"
                    className="form-control"
                    name="levelTwoContentType"
                    value={(!isNew && channelEntity.levelTwoContentType) || 'HTML'}
                  >
                    <option value="HTML">HTML</option>
                    <option value="XML">XML</option>
                    <option value="JSON">JSON</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="levelThreeContentTypeLabel">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.levelThreeContentType">
                      Level Three Content Type
                    </Translate>
                  </Label>
                  <AvInput
                    id="channel-levelThreeContentType"
                    type="select"
                    className="form-control"
                    name="levelThreeContentType"
                    value={(!isNew && channelEntity.levelThreeContentType) || 'HTML'}
                  >
                    <option value="HTML">HTML</option>
                    <option value="XML">XML</option>
                    <option value="JSON">JSON</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="levelFourContentTypeLabel">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.levelFourContentType">
                      Level Four Content Type
                    </Translate>
                  </Label>
                  <AvInput
                    id="channel-levelFourContentType"
                    type="select"
                    className="form-control"
                    name="levelFourContentType"
                    value={(!isNew && channelEntity.levelFourContentType) || 'HTML'}
                  >
                    <option value="HTML">HTML</option>
                    <option value="XML">XML</option>
                    <option value="JSON">JSON</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="allowExternalUrlLabel" check>
                    <AvInput id="channel-allowExternalUrl" type="checkbox" className="form-control" name="allowExternalUrl" />
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.allowExternalUrl">Allow External Url</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="targetChannelLabel">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.targetChannel">Target Channel</Translate>
                  </Label>
                  <AvInput
                    id="channel-targetChannel"
                    type="select"
                    className="form-control"
                    name="targetChannel"
                    value={(!isNew && channelEntity.targetChannel) || 'PUBLISHER'}
                  >
                    <option value="PUBLISHER">PUBLISHER</option>
                    <option value="CATEGORY">CATEGORY</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="targetLabel">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.target">Target</Translate>
                  </Label>
                  <AvInput
                    id="channel-target"
                    type="select"
                    className="form-control"
                    name="target"
                    value={(!isNew && channelEntity.target) || 'PUBLISHER'}
                  >
                    <option value="PUBLISHER">PUBLISHER</option>
                    <option value="CATEGORY">CATEGORY</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.name">Name</Translate>
                  </Label>
                  <AvField id="channel-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="siteDomainLabel" for="siteDomain">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.siteDomain">Site Domain</Translate>
                  </Label>
                  <AvField id="channel-siteDomain" type="text" name="siteDomain" />
                </AvGroup>
                <AvGroup>
                  <Label id="siteUrlLabel" for="siteUrl">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.siteUrl">Site Url</Translate>
                  </Label>
                  <AvField id="channel-siteUrl" type="text" name="siteUrl" />
                </AvGroup>
                <AvGroup>
                  <Label for="channelOuterLinks">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.outer">Outer</Translate>
                  </Label>
                  <AvInput
                    id="channel-outer"
                    type="select"
                    multiple
                    className="form-control"
                    name="fakechannelOuterLinks"
                    value={this.displayouter(channelEntity)}
                    onChange={this.outerUpdate}
                  >
                    <option value="" key="0" />
                    {channelOuterLinks
                      ? channelOuterLinks.map(otherEntity => (
                          <option value={otherEntity.configName} key={otherEntity.id}>
                            {otherEntity.configName}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvInput id="channel-outer" type="hidden" name="outers" value={this.state.idsouter} />
                </AvGroup>
                <AvGroup>
                  <Label for="configMappings">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.mapping">Mapping</Translate>
                  </Label>
                  <AvInput
                    id="channel-mapping"
                    type="select"
                    multiple
                    className="form-control"
                    name="fakeconfigMappings"
                    value={this.displaymapping(channelEntity)}
                    onChange={this.mappingUpdate}
                  >
                    <option value="" key="0" />
                    {configMappings
                      ? configMappings.map(otherEntity => (
                          <option value={otherEntity.name} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvInput id="channel-mapping" type="hidden" name="mappings" value={this.state.idsmapping} />
                </AvGroup>
                <AvGroup>
                  <Label for="configGroups">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.configGroup">Config Group</Translate>
                  </Label>
                  <AvInput
                    id="channel-configGroup"
                    type="select"
                    multiple
                    className="form-control"
                    name="fakeconfigGroups"
                    value={this.displayconfigGroup(channelEntity)}
                    onChange={this.configGroupUpdate}
                  >
                    <option value="" key="0" />
                    {configGroups
                      ? configGroups.map(otherEntity => (
                          <option value={otherEntity.name} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvInput id="channel-configGroup" type="hidden" name="configGroups" value={this.state.idsconfigGroup} />
                </AvGroup>
                <AvGroup>
                  <Label for="configGroups">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.targetGroup">Target Group</Translate>
                  </Label>
                  <AvInput
                    id="channel-targetGroup"
                    type="select"
                    multiple
                    className="form-control"
                    name="fakeconfigGroups"
                    value={this.displaytargetGroup(channelEntity)}
                    onChange={this.targetGroupUpdate}
                  >
                    <option value="" key="0" />
                    {configGroups
                      ? configGroups.map(otherEntity => (
                          <option value={otherEntity.name} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvInput id="channel-targetGroup" type="hidden" name="targetGroups" value={this.state.idstargetGroup} />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/channel" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={isInvalid || updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  channelOuterLinks: storeState.channelOuterLink.entities,
  configMappings: storeState.configMapping.entities,
  configGroups: storeState.configGroup.entities,
  channelEntity: storeState.channel.entity,
  loading: storeState.channel.loading,
  updating: storeState.channel.updating
});

const mapDispatchToProps = {
  getChannelOuterLinks,
  getConfigMappings,
  getConfigGroups,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelUpdate);
