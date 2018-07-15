import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, byteSize } from 'react-simlife';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './try-parser.reducer';
import { ITryParser } from 'app/shared/model/CrawlerConfiguration/try-parser.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITryParserDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class TryParserDetail extends React.Component<ITryParserDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { tryParserEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="crawlerEngineApp.crawlerConfigurationTryParser.detail.title">TryParser</Translate> [<b>
              {tryParserEntity.id}
            </b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="url">
                <Translate contentKey="crawlerEngineApp.crawlerConfigurationTryParser.url">Url</Translate>
              </span>
            </dt>
            <dd>{tryParserEntity.url}</dd>
            <dt>
              <span id="userAgent">
                <Translate contentKey="crawlerEngineApp.crawlerConfigurationTryParser.userAgent">User Agent</Translate>
              </span>
            </dt>
            <dd>{tryParserEntity.userAgent}</dd>
            <dt>
              <span id="htmlContent">
                <Translate contentKey="crawlerEngineApp.crawlerConfigurationTryParser.htmlContent">Html Content</Translate>
              </span>
            </dt>
            <dd>{tryParserEntity.htmlContent}</dd>
            <dt>
              <span id="parsedContent">
                <Translate contentKey="crawlerEngineApp.crawlerConfigurationTryParser.parsedContent">Parsed Content</Translate>
              </span>
            </dt>
            <dd>{tryParserEntity.parsedContent}</dd>
            <dt>
              <span id="selector">
                <Translate contentKey="crawlerEngineApp.crawlerConfigurationTryParser.selector">Selector</Translate>
              </span>
            </dt>
            <dd>{tryParserEntity.selector}</dd>
            <dt>
              <span id="selectorResult">
                <Translate contentKey="crawlerEngineApp.crawlerConfigurationTryParser.selectorResult">Selector Result</Translate>
              </span>
            </dt>
            <dd>{tryParserEntity.selectorResult}</dd>
            <dt>
              <span id="fetchEngine">
                <Translate contentKey="crawlerEngineApp.crawlerConfigurationTryParser.fetchEngine">Fetch Engine</Translate>
              </span>
            </dt>
            <dd>{tryParserEntity.fetchEngine}</dd>
            <dt>
              <span id="attributeSelector">
                <Translate contentKey="crawlerEngineApp.crawlerConfigurationTryParser.attributeSelector">Attribute Selector</Translate>
              </span>
            </dt>
            <dd>{tryParserEntity.attributeSelector}</dd>
            <dt>
              <span id="docType">
                <Translate contentKey="crawlerEngineApp.crawlerConfigurationTryParser.docType">Doc Type</Translate>
              </span>
            </dt>
            <dd>{tryParserEntity.docType}</dd>
          </dl>
          <Button tag={Link} to="/entity/try-parser" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/try-parser/${tryParserEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ tryParser }: IRootState) => ({
  tryParserEntity: tryParser.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TryParserDetail);
