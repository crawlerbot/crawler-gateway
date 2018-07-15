import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-simlife';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './config-mapping.reducer';
import { IConfigMapping } from 'app/shared/model/CrawlerConfiguration/config-mapping.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IConfigMappingDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class ConfigMappingDetail extends React.Component<IConfigMappingDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { configMappingEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="crawlerEngineApp.crawlerConfigurationConfigMapping.detail.title">ConfigMapping</Translate> [<b>
              {configMappingEntity.id}
            </b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="crawlerEngineApp.crawlerConfigurationConfigMapping.name">Name</Translate>
              </span>
            </dt>
            <dd>{configMappingEntity.name}</dd>
            <dt>
              <span id="selector">
                <Translate contentKey="crawlerEngineApp.crawlerConfigurationConfigMapping.selector">Selector</Translate>
              </span>
            </dt>
            <dd>{configMappingEntity.selector}</dd>
            <dt>
              <span id="host">
                <Translate contentKey="crawlerEngineApp.crawlerConfigurationConfigMapping.host">Host</Translate>
              </span>
            </dt>
            <dd>{configMappingEntity.host}</dd>
            <dt>
              <span id="configName">
                <Translate contentKey="crawlerEngineApp.crawlerConfigurationConfigMapping.configName">Config Name</Translate>
              </span>
            </dt>
            <dd>{configMappingEntity.configName}</dd>
            <dt>
              <span id="attr">
                <Translate contentKey="crawlerEngineApp.crawlerConfigurationConfigMapping.attr">Attr</Translate>
              </span>
            </dt>
            <dd>{configMappingEntity.attr}</dd>
            <dt>
              <span id="dataType">
                <Translate contentKey="crawlerEngineApp.crawlerConfigurationConfigMapping.dataType">Data Type</Translate>
              </span>
            </dt>
            <dd>{configMappingEntity.dataType}</dd>
          </dl>
          <Button tag={Link} to="/entity/config-mapping" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/config-mapping/${configMappingEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ configMapping }: IRootState) => ({
  configMappingEntity: configMapping.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigMappingDetail);
