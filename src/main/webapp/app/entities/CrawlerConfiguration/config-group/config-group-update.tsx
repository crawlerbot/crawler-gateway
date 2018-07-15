import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-simlife';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IConfigMapping } from 'app/shared/model/CrawlerConfiguration/config-mapping.model';
import { getEntities as getConfigMappings } from 'app/entities/CrawlerConfiguration/config-mapping/config-mapping.reducer';
import { getEntity, updateEntity, createEntity, reset } from './config-group.reducer';
import { IConfigGroup } from 'app/shared/model/CrawlerConfiguration/config-group.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IConfigGroupUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IConfigGroupUpdateState {
  isNew: boolean;
  idsmapping: any[];
}

export class ConfigGroupUpdate extends React.Component<IConfigGroupUpdateProps, IConfigGroupUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsmapping: [],
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getConfigMappings();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { configGroupEntity } = this.props;
      const entity = {
        ...configGroupEntity,
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
    this.props.history.push('/entity/config-group');
  };

  mappingUpdate = element => {
    const selected = Array.from(element.target.selectedOptions).map((e: any) => e.value);
    this.setState({
      idsmapping: keysToValues(selected, this.props.configMappings, 'name')
    });
  };

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

  render() {
    const isInvalid = false;
    const { configGroupEntity, configMappings, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="crawlerEngineApp.crawlerConfigurationConfigGroup.home.createOrEditLabel">
              <Translate contentKey="crawlerEngineApp.crawlerConfigurationConfigGroup.home.createOrEditLabel">
                Create or edit a ConfigGroup
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : configGroupEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="config-group-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationConfigGroup.name">Name</Translate>
                  </Label>
                  <AvField id="config-group-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="hostLabel" for="host">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationConfigGroup.host">Host</Translate>
                  </Label>
                  <AvField id="config-group-host" type="text" name="host" />
                </AvGroup>
                <AvGroup>
                  <Label id="currentLevelLabel" for="currentLevel">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationConfigGroup.currentLevel">Current Level</Translate>
                  </Label>
                  <AvField id="config-group-currentLevel" type="number" className="form-control" name="currentLevel" />
                </AvGroup>
                <AvGroup>
                  <Label id="expectResultTypeLabel">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationConfigGroup.expectResultType">Expect Result Type</Translate>
                  </Label>
                  <AvInput
                    id="config-group-expectResultType"
                    type="select"
                    className="form-control"
                    name="expectResultType"
                    value={(!isNew && configGroupEntity.expectResultType) || 'OBJECT'}
                  >
                    <option value="OBJECT">OBJECT</option>
                    <option value="ARRAY">ARRAY</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="configMappings">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationConfigGroup.mapping">Mapping</Translate>
                  </Label>
                  <AvInput
                    id="config-group-mapping"
                    type="select"
                    multiple
                    className="form-control"
                    name="fakeconfigMappings"
                    value={this.displaymapping(configGroupEntity)}
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
                  <AvInput id="config-group-mapping" type="hidden" name="mappings" value={this.state.idsmapping} />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/config-group" replace color="info">
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
  configMappings: storeState.configMapping.entities,
  configGroupEntity: storeState.configGroup.entity,
  loading: storeState.configGroup.loading,
  updating: storeState.configGroup.updating
});

const mapDispatchToProps = {
  getConfigMappings,
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
)(ConfigGroupUpdate);
