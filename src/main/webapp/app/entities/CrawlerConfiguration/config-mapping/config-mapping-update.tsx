import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-simlife';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './config-mapping.reducer';
import { IConfigMapping } from 'app/shared/model/CrawlerConfiguration/config-mapping.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IConfigMappingUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IConfigMappingUpdateState {
  isNew: boolean;
}

export class ConfigMappingUpdate extends React.Component<IConfigMappingUpdateProps, IConfigMappingUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { configMappingEntity } = this.props;
      const entity = {
        ...configMappingEntity,
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
    this.props.history.push('/entity/config-mapping');
  };

  render() {
    const isInvalid = false;
    const { configMappingEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="crawlerEngineApp.crawlerConfigurationConfigMapping.home.createOrEditLabel">
              <Translate contentKey="crawlerEngineApp.crawlerConfigurationConfigMapping.home.createOrEditLabel">
                Create or edit a ConfigMapping
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : configMappingEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="config-mapping-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationConfigMapping.name">Name</Translate>
                  </Label>
                  <AvField id="config-mapping-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="selectorLabel" for="selector">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationConfigMapping.selector">Selector</Translate>
                  </Label>
                  <AvField id="config-mapping-selector" type="text" name="selector" />
                </AvGroup>
                <AvGroup>
                  <Label id="hostLabel" for="host">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationConfigMapping.host">Host</Translate>
                  </Label>
                  <AvField id="config-mapping-host" type="text" name="host" />
                </AvGroup>
                <AvGroup>
                  <Label id="configNameLabel" for="configName">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationConfigMapping.configName">Config Name</Translate>
                  </Label>
                  <AvField id="config-mapping-configName" type="text" name="configName" />
                </AvGroup>
                <AvGroup>
                  <Label id="attrLabel" for="attr">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationConfigMapping.attr">Attr</Translate>
                  </Label>
                  <AvField id="config-mapping-attr" type="text" name="attr" />
                </AvGroup>
                <AvGroup>
                  <Label id="dataTypeLabel">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationConfigMapping.dataType">Data Type</Translate>
                  </Label>
                  <AvInput
                    id="config-mapping-dataType"
                    type="select"
                    className="form-control"
                    name="dataType"
                    value={(!isNew && configMappingEntity.dataType) || 'INTEGER'}
                  >
                    <option value="INTEGER">INTEGER</option>
                    <option value="STRING">STRING</option>
                    <option value="DOUBLE">DOUBLE</option>
                    <option value="FLOAT">FLOAT</option>
                    <option value="DATE">DATE</option>
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/config-mapping" replace color="info">
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
  configMappingEntity: storeState.configMapping.entity,
  loading: storeState.configMapping.loading,
  updating: storeState.configMapping.updating
});

const mapDispatchToProps = {
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
)(ConfigMappingUpdate);
