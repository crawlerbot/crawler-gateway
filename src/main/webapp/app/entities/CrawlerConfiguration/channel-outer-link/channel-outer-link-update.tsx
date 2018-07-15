import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-simlife';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './channel-outer-link.reducer';
import { IChannelOuterLink } from 'app/shared/model/CrawlerConfiguration/channel-outer-link.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IChannelOuterLinkUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IChannelOuterLinkUpdateState {
  isNew: boolean;
}

export class ChannelOuterLinkUpdate extends React.Component<IChannelOuterLinkUpdateProps, IChannelOuterLinkUpdateState> {
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
      const { channelOuterLinkEntity } = this.props;
      const entity = {
        ...channelOuterLinkEntity,
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
    this.props.history.push('/entity/channel-outer-link');
  };

  render() {
    const isInvalid = false;
    const { channelOuterLinkEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="crawlerEngineApp.crawlerConfigurationChannelOuterLink.home.createOrEditLabel">
              <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannelOuterLink.home.createOrEditLabel">
                Create or edit a ChannelOuterLink
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : channelOuterLinkEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="channel-outer-link-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="configNameLabel" for="configName">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannelOuterLink.configName">Config Name</Translate>
                  </Label>
                  <AvField id="channel-outer-link-configName" type="text" name="configName" />
                </AvGroup>
                <AvGroup>
                  <Label id="selectorNameLabel" for="selectorName">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannelOuterLink.selectorName">Selector Name</Translate>
                  </Label>
                  <AvField id="channel-outer-link-selectorName" type="text" name="selectorName" />
                </AvGroup>
                <AvGroup>
                  <Label id="selectorAttrLabel" for="selectorAttr">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannelOuterLink.selectorAttr">Selector Attr</Translate>
                  </Label>
                  <AvField id="channel-outer-link-selectorAttr" type="text" name="selectorAttr" />
                </AvGroup>
                <AvGroup>
                  <Label id="hostLabel" for="host">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannelOuterLink.host">Host</Translate>
                  </Label>
                  <AvField id="channel-outer-link-host" type="text" name="host" />
                </AvGroup>
                <AvGroup>
                  <Label id="urlLabel" for="url">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationChannelOuterLink.url">Url</Translate>
                  </Label>
                  <AvField id="channel-outer-link-url" type="text" name="url" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/channel-outer-link" replace color="info">
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
  channelOuterLinkEntity: storeState.channelOuterLink.entity,
  loading: storeState.channelOuterLink.loading,
  updating: storeState.channelOuterLink.updating
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
)(ChannelOuterLinkUpdate);
