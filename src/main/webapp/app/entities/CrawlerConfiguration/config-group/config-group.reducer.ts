import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-simlife';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';
import { IConfigGroup, defaultValue } from 'app/shared/model/CrawlerConfiguration/config-group.model';

export const ACTION_TYPES = {
  SEARCH_CONFIGGROUPS: 'configGroup/SEARCH_CONFIGGROUPS',
  FETCH_CONFIGGROUP_LIST: 'configGroup/FETCH_CONFIGGROUP_LIST',
  FETCH_CONFIGGROUP: 'configGroup/FETCH_CONFIGGROUP',
  CREATE_CONFIGGROUP: 'configGroup/CREATE_CONFIGGROUP',
  UPDATE_CONFIGGROUP: 'configGroup/UPDATE_CONFIGGROUP',
  DELETE_CONFIGGROUP: 'configGroup/DELETE_CONFIGGROUP',
  RESET: 'configGroup/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IConfigGroup>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ConfigGroupState = Readonly<typeof initialState>;

// Reducer

export default (state: ConfigGroupState = initialState, action): ConfigGroupState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_CONFIGGROUPS):
    case REQUEST(ACTION_TYPES.FETCH_CONFIGGROUP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CONFIGGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CONFIGGROUP):
    case REQUEST(ACTION_TYPES.UPDATE_CONFIGGROUP):
    case REQUEST(ACTION_TYPES.DELETE_CONFIGGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_CONFIGGROUPS):
    case FAILURE(ACTION_TYPES.FETCH_CONFIGGROUP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CONFIGGROUP):
    case FAILURE(ACTION_TYPES.CREATE_CONFIGGROUP):
    case FAILURE(ACTION_TYPES.UPDATE_CONFIGGROUP):
    case FAILURE(ACTION_TYPES.DELETE_CONFIGGROUP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_CONFIGGROUPS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONFIGGROUP_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONFIGGROUP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CONFIGGROUP):
    case SUCCESS(ACTION_TYPES.UPDATE_CONFIGGROUP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CONFIGGROUP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = '/crawlerconfiguration/api/config-groups';
const apiSearchUrl = '/crawlerconfiguration//api/_search/config-groups';

// Actions

export const getSearchEntities: ICrudSearchAction<IConfigGroup> = query => ({
  type: ACTION_TYPES.SEARCH_CONFIGGROUPS,
  payload: axios.get<IConfigGroup>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IConfigGroup> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_CONFIGGROUP_LIST,
    payload: axios.get<IConfigGroup>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IConfigGroup> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CONFIGGROUP,
    payload: axios.get<IConfigGroup>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IConfigGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CONFIGGROUP,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IConfigGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CONFIGGROUP,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IConfigGroup> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CONFIGGROUP,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
