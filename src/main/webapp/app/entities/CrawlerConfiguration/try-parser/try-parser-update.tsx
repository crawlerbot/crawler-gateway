import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-simlife';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './try-parser.reducer';
import { ITryParser } from 'app/shared/model/CrawlerConfiguration/try-parser.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface ITryParserUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ITryParserUpdateState {
  isNew: boolean;
}

export class TryParserUpdate extends React.Component<ITryParserUpdateProps, ITryParserUpdateState> {
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

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { tryParserEntity } = this.props;
      const entity = {
        ...tryParserEntity,
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
    this.props.history.push('/entity/try-parser');
  };

  render() {
    const isInvalid = false;
    const { tryParserEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const { htmlContent, parsedContent, selectorResult } = tryParserEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="crawlerEngineApp.crawlerConfigurationTryParser.home.createOrEditLabel">
              <Translate contentKey="crawlerEngineApp.crawlerConfigurationTryParser.home.createOrEditLabel">
                Create or edit a TryParser
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : tryParserEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="try-parser-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="urlLabel" for="url">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationTryParser.url">Url</Translate>
                  </Label>
                  <AvField id="try-parser-url" type="text" name="url" />
                </AvGroup>
                <AvGroup>
                  <Label id="userAgentLabel" for="userAgent">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationTryParser.userAgent">User Agent</Translate>
                  </Label>
                  <AvField id="try-parser-userAgent" type="text" name="userAgent" />
                </AvGroup>
                <AvGroup>
                  <Label id="htmlContentLabel" for="htmlContent">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationTryParser.htmlContent">Html Content</Translate>
                  </Label>
                  <AvField id="try-parser-htmlContent" type="text" name="htmlContent" />
                </AvGroup>
                <AvGroup>
                  <Label id="parsedContentLabel" for="parsedContent">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationTryParser.parsedContent">Parsed Content</Translate>
                  </Label>
                  <AvField id="try-parser-parsedContent" type="text" name="parsedContent" />
                </AvGroup>
                <AvGroup>
                  <Label id="selectorLabel" for="selector">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationTryParser.selector">Selector</Translate>
                  </Label>
                  <AvField id="try-parser-selector" type="text" name="selector" />
                </AvGroup>
                <AvGroup>
                  <Label id="selectorResultLabel" for="selectorResult">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationTryParser.selectorResult">Selector Result</Translate>
                  </Label>
                  <AvField id="try-parser-selectorResult" type="text" name="selectorResult" />
                </AvGroup>
                <AvGroup>
                  <Label id="fetchEngineLabel">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationTryParser.fetchEngine">Fetch Engine</Translate>
                  </Label>
                  <AvInput
                    id="try-parser-fetchEngine"
                    type="select"
                    className="form-control"
                    name="fetchEngine"
                    value={(!isNew && tryParserEntity.fetchEngine) || 'HTTP'}
                  >
                    <option value="HTTP">HTTP</option>
                    <option value="SELENIUM">SELENIUM</option>
                    <option value="RSS">RSS</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="attributeSelectorLabel" for="attributeSelector">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationTryParser.attributeSelector">Attribute Selector</Translate>
                  </Label>
                  <AvField id="try-parser-attributeSelector" type="text" name="attributeSelector" />
                </AvGroup>
                <AvGroup>
                  <Label id="docTypeLabel">
                    <Translate contentKey="crawlerEngineApp.crawlerConfigurationTryParser.docType">Doc Type</Translate>
                  </Label>
                  <AvInput
                    id="try-parser-docType"
                    type="select"
                    className="form-control"
                    name="docType"
                    value={(!isNew && tryParserEntity.docType) || 'HTML'}
                  >
                    <option value="HTML">HTML</option>
                    <option value="XML">XML</option>
                    <option value="JSON">JSON</option>
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/try-parser" replace color="info">
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
  tryParserEntity: storeState.tryParser.entity,
  loading: storeState.tryParser.loading,
  updating: storeState.tryParser.updating
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TryParserUpdate);
