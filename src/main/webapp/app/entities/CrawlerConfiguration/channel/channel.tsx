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
import { getSearchEntities, getEntities } from './channel.reducer';
import { IChannel } from 'app/shared/model/CrawlerConfiguration/channel.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IChannelProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IChannelState extends IPaginationBaseState {
  search: string;
}

export class Channel extends React.Component<IChannelProps, IChannelState> {
  state: IChannelState = {
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
    const { channelList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="channel-heading">
          <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.home.title">Channels</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.home.createLabel">Create new Channel</Translate>
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
                    placeholder={translate('crawlerEngineApp.crawlerConfigurationChannel.home.search')}
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
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.url">Url</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('contentType')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.contentType">Content Type</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('schedule')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.schedule">Schedule</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('scheduleTimeZone')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.scheduleTimeZone">Schedule Time Zone</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('totalLevel')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.totalLevel">Total Level</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('archiveLevel')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.archiveLevel">Archive Level</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('unlimitedLevel')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.unlimitedLevel">Unlimited Level</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('fetchEngine')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.fetchEngine">Fetch Engine</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('category')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.category">Category</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('tag')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.tag">Tag</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('categorySlug')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.categorySlug">Category Slug</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('tagSlug')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.tagSlug">Tag Slug</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('countryCode')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.countryCode">Country Code</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('languageCode')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.languageCode">Language Code</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('targetQueueChannel')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.targetQueueChannel">Target Queue Channel</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('topics')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.topics">Topics</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('topicSlugs')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.topicSlugs">Topic Slugs</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('postType')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.postType">Post Type</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('rankingCountry')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.rankingCountry">Ranking Country</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelTotalLevel')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.channelTotalLevel">Channel Total Level</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelArchiveLevel')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.channelArchiveLevel">Channel Archive Level</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelFetchEngine')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.channelFetchEngine">Channel Fetch Engine</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelRanking')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.channelRanking">Channel Ranking</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelTargetQueue')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.channelTargetQueue">Channel Target Queue</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelTargetPostType')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.channelTargetPostType">
                    Channel Target Post Type
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelLevelOneFetchEngine')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.channelLevelOneFetchEngine">
                    Channel Level One Fetch Engine
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelLevelTwoFetchEngine')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.channelLevelTwoFetchEngine">
                    Channel Level Two Fetch Engine
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelLevelThreeFetchEngine')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.channelLevelThreeFetchEngine">
                    Channel Level Three Fetch Engine
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelLevelFourFetchEngine')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.channelLevelFourFetchEngine">
                    Channel Level Four Fetch Engine
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelLevelOneContentType')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.channelLevelOneContentType">
                    Channel Level One Content Type
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelLevelTwoContentType')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.channelLevelTwoContentType">
                    Channel Level Two Content Type
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelLevelThreeContentType')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.channelLevelThreeContentType">
                    Channel Level Three Content Type
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelLevelFourContentType')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.channelLevelFourContentType">
                    Channel Level Four Content Type
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelAllowExternalUrl')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.channelAllowExternalUrl">
                    Channel Allow External Url
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelLogo')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.channelLogo">Channel Logo</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelSiteName')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.channelSiteName">Channel Site Name</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('logo')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.logo">Logo</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('siteName')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.siteName">Site Name</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelType')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.channelType">Channel Type</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('levelOneFetchEngine')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.levelOneFetchEngine">
                    Level One Fetch Engine
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('levelTwoFetchEngine')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.levelTwoFetchEngine">
                    Level Two Fetch Engine
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('levelThreeFetchEngine')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.levelThreeFetchEngine">
                    Level Three Fetch Engine
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('levelFourFetchEngine')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.levelFourFetchEngine">
                    Level Four Fetch Engine
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('levelOneContentType')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.levelOneContentType">
                    Level One Content Type
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('levelTwoContentType')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.levelTwoContentType">
                    Level Two Content Type
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('levelThreeContentType')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.levelThreeContentType">
                    Level Three Content Type
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('levelFourContentType')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.levelFourContentType">
                    Level Four Content Type
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('allowExternalUrl')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.allowExternalUrl">Allow External Url</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('targetChannel')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.targetChannel">Target Channel</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('target')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.target">Target</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('name')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.name">Name</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('siteDomain')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.siteDomain">Site Domain</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('siteUrl')}>
                  <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannel.siteUrl">Site Url</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {channelList.map((channel, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${channel.id}`} color="link" size="sm">
                      {channel.id}
                    </Button>
                  </td>
                  <td>{channel.url}</td>
                  <td>{channel.contentType}</td>
                  <td>{channel.schedule}</td>
                  <td>{channel.scheduleTimeZone}</td>
                  <td>{channel.totalLevel}</td>
                  <td>{channel.archiveLevel}</td>
                  <td>{channel.unlimitedLevel ? 'true' : 'false'}</td>
                  <td>{channel.fetchEngine}</td>
                  <td>{channel.category}</td>
                  <td>{channel.tag}</td>
                  <td>{channel.categorySlug}</td>
                  <td>{channel.tagSlug}</td>
                  <td>{channel.countryCode}</td>
                  <td>{channel.languageCode}</td>
                  <td>{channel.targetQueueChannel}</td>
                  <td>{channel.topics}</td>
                  <td>{channel.topicSlugs}</td>
                  <td>{channel.postType}</td>
                  <td>{channel.rankingCountry}</td>
                  <td>{channel.channelTotalLevel}</td>
                  <td>{channel.channelArchiveLevel}</td>
                  <td>{channel.channelFetchEngine}</td>
                  <td>{channel.channelRanking}</td>
                  <td>{channel.channelTargetQueue}</td>
                  <td>{channel.channelTargetPostType}</td>
                  <td>{channel.channelLevelOneFetchEngine}</td>
                  <td>{channel.channelLevelTwoFetchEngine}</td>
                  <td>{channel.channelLevelThreeFetchEngine}</td>
                  <td>{channel.channelLevelFourFetchEngine}</td>
                  <td>{channel.channelLevelOneContentType}</td>
                  <td>{channel.channelLevelTwoContentType}</td>
                  <td>{channel.channelLevelThreeContentType}</td>
                  <td>{channel.channelLevelFourContentType}</td>
                  <td>{channel.channelAllowExternalUrl ? 'true' : 'false'}</td>
                  <td>{channel.channelLogo}</td>
                  <td>{channel.channelSiteName}</td>
                  <td>{channel.logo}</td>
                  <td>{channel.siteName}</td>
                  <td>{channel.channelType}</td>
                  <td>{channel.levelOneFetchEngine}</td>
                  <td>{channel.levelTwoFetchEngine}</td>
                  <td>{channel.levelThreeFetchEngine}</td>
                  <td>{channel.levelFourFetchEngine}</td>
                  <td>{channel.levelOneContentType}</td>
                  <td>{channel.levelTwoContentType}</td>
                  <td>{channel.levelThreeContentType}</td>
                  <td>{channel.levelFourContentType}</td>
                  <td>{channel.allowExternalUrl ? 'true' : 'false'}</td>
                  <td>{channel.targetChannel}</td>
                  <td>{channel.target}</td>
                  <td>{channel.name}</td>
                  <td>{channel.siteDomain}</td>
                  <td>{channel.siteUrl}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${channel.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${channel.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${channel.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ channel }: IRootState) => ({
  channelList: channel.entities,
  totalItems: channel.totalItems
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
)(Channel);
