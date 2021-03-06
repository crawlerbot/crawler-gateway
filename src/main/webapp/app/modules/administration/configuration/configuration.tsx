import React from 'react';
import { connect } from 'react-redux';
import { Table, Input, Row, Col, Badge } from 'reactstrap';
import { Translate } from 'react-simlife';

import { getConfigurations, getEnv } from '../administration.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IConfigurationPageProps extends StateProps, DispatchProps {}

export interface IConfigurationPageState {
  filter: string;
  reversePrefix: boolean;
  reverseProperties: boolean;
}

export class ConfigurationPage extends React.Component<IConfigurationPageProps, IConfigurationPageState> {
  state: IConfigurationPageState = {
    filter: '',
    reversePrefix: false,
    reverseProperties: false
  };

  componentDidMount() {
    this.props.getConfigurations();
    this.props.getEnv();
  }

  setFilter = evt => {
    this.setState({
      filter: evt.target.value
    });
  };

  envFilterFn = configProp => configProp.toUpperCase().includes(this.state.filter.toUpperCase());
  propsFilterFn = configProp => configProp.prefix.toUpperCase().includes(this.state.filter.toUpperCase());

  reversePrefix = () => {
    this.setState({
      reversePrefix: !this.state.reversePrefix
    });
  };

  reverseProperties = () => {
    this.setState({
      reverseProperties: !this.state.reverseProperties
    });
  };

  getContextList = contexts =>
    Object.values(contexts)
      .map((v: any) => v.beans)
      .reduce((acc, e) => ({ ...acc, ...e }));

  render() {
    const { configuration } = this.props;
    const { filter } = this.state;
    const configProps = configuration && configuration.configProps ? configuration.configProps : {};
    const env = configuration && configuration.env ? configuration.env : {};
    return (
      <div>
        <h2 className="configuration-page-heading">
          <Translate contentKey="configuration.title">Configuration</Translate>
        </h2>
        <span>
          <Translate contentKey="configuration.filter">Filter</Translate>
        </span>{' '}
        <Input type="search" value={filter} onChange={this.setFilter} name="search" id="search" />
        <label>Spring configuration</label>
        <Table className="table table-striped table-bordered table-responsive d-table">
          <thead>
            <tr>
              <th onClick={this.reversePrefix}>
                <Translate contentKey="configuration.table.prefix">Prefix</Translate>
              </th>
              <th onClick={this.reverseProperties}>
                <Translate contentKey="configuration.table.properties">Properties</Translate>
              </th>
            </tr>
          </thead>
          <tbody>
            {configProps.contexts
              ? Object.values(this.getContextList(configProps.contexts))
                  .filter(this.propsFilterFn)
                  .map((property, propIndex) => (
                    <tr key={propIndex}>
                      <td>{property['prefix']}</td>
                      <td>
                        {Object.keys(property['properties']).map((propKey, index) => (
                          <Row key={index}>
                            <Col md="4">{propKey}</Col>
                            <Col md="8">
                              <Badge className="float-right badge-secondary break">{JSON.stringify(property['properties'][propKey])}</Badge>
                            </Col>
                          </Row>
                        ))}
                      </td>
                    </tr>
                  ))
              : null}
          </tbody>
        </Table>
        {env.propertySources
          ? env.propertySources.map((envKey, envIndex) => (
              <div key={envIndex}>
                <h4>
                  <span>{envKey.name}</span>
                </h4>
                <Table className="table table-sm table-striped table-bordered table-responsive d-table">
                  <thead>
                    <tr key={envIndex}>
                      <th className="w-40">Property</th>
                      <th className="w-60">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(envKey.properties)
                      .filter(this.envFilterFn)
                      .map((propKey, propIndex) => (
                        <tr key={propIndex}>
                          <td className="break">{propKey}</td>
                          <td className="break">
                            <span className="float-right badge badge-secondary break">{envKey.properties[propKey].value}</span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            ))
          : null}
      </div>
    );
  }
}

const mapStateToProps = ({ administration }: IRootState) => ({
  configuration: administration.configuration,
  isFetching: administration.loading
});

const mapDispatchToProps = { getConfigurations, getEnv };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigurationPage);
