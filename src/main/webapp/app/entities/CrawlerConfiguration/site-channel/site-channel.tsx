import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import {
  Translate,
  translate,
  ICrudSearchAction,
  ICrudGetAllAction,
  getSortState,
  IPaginationBaseState,
  getPaginationItemsNumber,
  SimPagination
} from 'react-simlife';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './site-channel.reducer';
import { ISiteChannel } from 'app/shared/model/CrawlerConfiguration/site-channel.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ISiteChannelProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ISiteChannelState extends IPaginationBaseState {
  search: string;
}

export class SiteChannel extends React.Component<ISiteChannelProps, ISiteChannelState> {
  state: ISiteChannelState = {
    search: '',
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

  search = () => {
    if (this.state.search) {
      this.props.getSearchEntities(this.state.search);
    }
  };

  clear = () => {
    this.props.getEntities();
    this.setState({
      search: ''
    });
  };

  handleSearch = event => this.setState({ search: event.target.value });

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { siteChannelList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="site-channel-heading">
          <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.home.title">Site Channels</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.home.createLabel">Create new Site Channel</Translate>
          </Link>
        </h2>
        <Row>
          <Col sm="12">
            <AvForm onSubmit={this.search}>
              <AvGroup>
                <InputGroup>
                  <AvInput
                    type="text"
                    name="search"
                    value={this.state.search}
                    onChange={this.handleSearch}
                    placeholder={translate('crawlerEngineApp.crawlerConfigurationSiteChannel.home.search')}
                  />
                  <Button className="input-group-addon">
                    <FontAwesomeIcon icon="search" />
                  </Button>
                  <Button type="reset" className="input-group-addon" onClick={this.clear}>
                    <FontAwesomeIcon icon="trash" />
                  </Button>
                </InputGroup>
              </AvGroup>
            </AvForm>
          </Col>
        </Row>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={this.sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('url')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.url">Url</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('contentType')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.contentType">Content Type</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('schedule')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.schedule">Schedule</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('scheduleTimeZone')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.scheduleTimeZone">Schedule Time Zone</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('totalLevel')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.totalLevel">Total Level</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('archiveLevel')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.archiveLevel">Archive Level</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('unlimitedLevel')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.unlimitedLevel">Unlimited Level</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('fetchEngine')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.fetchEngine">Fetch Engine</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('category')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.category">Category</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('tag')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.tag">Tag</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('categorySlug')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.categorySlug">Category Slug</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('tagSlug')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.tagSlug">Tag Slug</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('countryCode')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.countryCode">Country Code</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('languageCode')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.languageCode">Language Code</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('targetQueueChannel')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.targetQueueChannel">
                    Target Queue Channel
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('topics')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.topics">Topics</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('topicSlugs')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.topicSlugs">Topic Slugs</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('postType')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.postType">Post Type</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('rankingCountry')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.rankingCountry">Ranking Country</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelTotalLevel')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.channelTotalLevel">Channel Total Level</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelArchiveLevel')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.channelArchiveLevel">
                    Channel Archive Level
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelFetchEngine')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.channelFetchEngine">
                    Channel Fetch Engine
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelRanking')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.channelRanking">Channel Ranking</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelTargetQueue')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.channelTargetQueue">
                    Channel Target Queue
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelTargetPostType')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.channelTargetPostType">
                    Channel Target Post Type
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelLevelOneFetchEngine')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.channelLevelOneFetchEngine">
                    Channel Level One Fetch Engine
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelLevelTwoFetchEngine')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.channelLevelTwoFetchEngine">
                    Channel Level Two Fetch Engine
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelLevelThreeFetchEngine')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.channelLevelThreeFetchEngine">
                    Channel Level Three Fetch Engine
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelLevelFourFetchEngine')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.channelLevelFourFetchEngine">
                    Channel Level Four Fetch Engine
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelLevelOneContentType')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.channelLevelOneContentType">
                    Channel Level One Content Type
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelLevelTwoContentType')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.channelLevelTwoContentType">
                    Channel Level Two Content Type
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelLevelThreeContentType')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.channelLevelThreeContentType">
                    Channel Level Three Content Type
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelLevelFourContentType')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.channelLevelFourContentType">
                    Channel Level Four Content Type
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelAllowExternalUrl')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.channelAllowExternalUrl">
                    Channel Allow External Url
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelLogo')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.channelLogo">Channel Logo</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelSiteName')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.channelSiteName">Channel Site Name</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('logo')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.logo">Logo</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('siteName')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.siteName">Site Name</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelType')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.channelType">Channel Type</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('levelOneFetchEngine')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.levelOneFetchEngine">
                    Level One Fetch Engine
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('levelTwoFetchEngine')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.levelTwoFetchEngine">
                    Level Two Fetch Engine
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('levelThreeFetchEngine')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.levelThreeFetchEngine">
                    Level Three Fetch Engine
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('levelFourFetchEngine')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.levelFourFetchEngine">
                    Level Four Fetch Engine
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('levelOneContentType')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.levelOneContentType">
                    Level One Content Type
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('levelTwoContentType')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.levelTwoContentType">
                    Level Two Content Type
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('levelThreeContentType')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.levelThreeContentType">
                    Level Three Content Type
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('levelFourContentType')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.levelFourContentType">
                    Level Four Content Type
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('allowExternalUrl')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.allowExternalUrl">Allow External Url</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('siteUrl')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.siteUrl">Site Url</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('targetChannel')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.targetChannel">Target Channel</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('target')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.target">Target</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('siteDomain')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationSiteChannel.siteDomain">Site Domain</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {siteChannelList.map((siteChannel, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${siteChannel.id}`} color="link" size="sm">
                      {siteChannel.id}
                    </Button>
                  </td>
                  <td>{siteChannel.url}</td>
                  <td>{siteChannel.contentType}</td>
                  <td>{siteChannel.schedule}</td>
                  <td>{siteChannel.scheduleTimeZone}</td>
                  <td>{siteChannel.totalLevel}</td>
                  <td>{siteChannel.archiveLevel}</td>
                  <td>{siteChannel.unlimitedLevel ? 'true' : 'false'}</td>
                  <td>{siteChannel.fetchEngine}</td>
                  <td>{siteChannel.category}</td>
                  <td>{siteChannel.tag}</td>
                  <td>{siteChannel.categorySlug}</td>
                  <td>{siteChannel.tagSlug}</td>
                  <td>{siteChannel.countryCode}</td>
                  <td>{siteChannel.languageCode}</td>
                  <td>{siteChannel.targetQueueChannel}</td>
                  <td>{siteChannel.topics}</td>
                  <td>{siteChannel.topicSlugs}</td>
                  <td>{siteChannel.postType}</td>
                  <td>{siteChannel.rankingCountry}</td>
                  <td>{siteChannel.channelTotalLevel}</td>
                  <td>{siteChannel.channelArchiveLevel}</td>
                  <td>{siteChannel.channelFetchEngine}</td>
                  <td>{siteChannel.channelRanking}</td>
                  <td>{siteChannel.channelTargetQueue}</td>
                  <td>{siteChannel.channelTargetPostType}</td>
                  <td>{siteChannel.channelLevelOneFetchEngine}</td>
                  <td>{siteChannel.channelLevelTwoFetchEngine}</td>
                  <td>{siteChannel.channelLevelThreeFetchEngine}</td>
                  <td>{siteChannel.channelLevelFourFetchEngine}</td>
                  <td>{siteChannel.channelLevelOneContentType}</td>
                  <td>{siteChannel.channelLevelTwoContentType}</td>
                  <td>{siteChannel.channelLevelThreeContentType}</td>
                  <td>{siteChannel.channelLevelFourContentType}</td>
                  <td>{siteChannel.channelAllowExternalUrl ? 'true' : 'false'}</td>
                  <td>{siteChannel.channelLogo}</td>
                  <td>{siteChannel.channelSiteName}</td>
                  <td>{siteChannel.logo}</td>
                  <td>{siteChannel.siteName}</td>
                  <td>{siteChannel.channelType}</td>
                  <td>{siteChannel.levelOneFetchEngine}</td>
                  <td>{siteChannel.levelTwoFetchEngine}</td>
                  <td>{siteChannel.levelThreeFetchEngine}</td>
                  <td>{siteChannel.levelFourFetchEngine}</td>
                  <td>{siteChannel.levelOneContentType}</td>
                  <td>{siteChannel.levelTwoContentType}</td>
                  <td>{siteChannel.levelThreeContentType}</td>
                  <td>{siteChannel.levelFourContentType}</td>
                  <td>{siteChannel.allowExternalUrl ? 'true' : 'false'}</td>
                  <td>{siteChannel.siteUrl}</td>
                  <td>{siteChannel.targetChannel}</td>
                  <td>{siteChannel.target}</td>
                  <td>{siteChannel.siteDomain}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${siteChannel.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${siteChannel.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${siteChannel.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Row className="justify-content-center">
          <SimPagination
            items={getPaginationItemsNumber(totalItems, this.state.itemsPerPage)}
            activePage={this.state.activePage}
            onSelect={this.handlePagination}
            maxButtons={5}
          />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ siteChannel }: IRootState) => ({
  siteChannelList: siteChannel.entities,
  totalItems: siteChannel.totalItems
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteChannel);
