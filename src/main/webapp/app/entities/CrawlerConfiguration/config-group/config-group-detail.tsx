import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-simlife';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './config-group.reducer';
import { IConfigGroup } from 'app/shared/model/CrawlerConfiguration/config-group.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IConfigGroupDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class ConfigGroupDetail extends React.Component<IConfigGroupDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { configGroupEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="crawlerEngineApp.crawlerConfigurationConfigGroup.detail.title">ConfigGroup</Translate> [<b>
              {configGroupEntity.id}
            </b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="crawlerEngineApp.crawlerConfigurationConfigGroup.name">Name</Translate>
              </span>
            </dt>
            <dd>{configGroupEntity.name}</dd>
            <dt>
              <span id="host">
                <Translate contentKey="crawlerEngineApp.crawlerConfigurationConfigGroup.host">Host</Translate>
              </span>
            </dt>
            <dd>{configGroupEntity.host}</dd>
            <dt>
              <span id="currentLevel">
                <Translate contentKey="crawlerEngineApp.crawlerConfigurationConfigGroup.currentLevel">Current Level</Translate>
              </span>
            </dt>
            <dd>{configGroupEntity.currentLevel}</dd>
            <dt>
              <span id="expectResultType">
                <Translate contentKey="crawlerEngineApp.crawlerConfigurationConfigGroup.expectResultType">Expect Result Type</Translate>
              </span>
            </dt>
            <dd>{configGroupEntity.expectResultType}</dd>
            <dt>
              <Translate contentKey="crawlerEngineApp.crawlerConfigurationConfigGroup.mapping">Mapping</Translate>
            </dt>
            <dd>
              {configGroupEntity.mappings
                ? configGroupEntity.mappings.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.name}</a>
                      {i === configGroupEntity.mappings.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/config-group" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/config-group/${configGroupEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ configGroup }: IRootState) => ({
  configGroupEntity: configGroup.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigGroupDetail);
