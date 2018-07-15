import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-simlife';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';
import { IConfigMapping, defaultValue } from 'app/shared/model/CrawlerConfiguration/config-mapping.model';

export const ACTION_TYPES = {
  SEARCH_CONFIGMAPPINGS: 'configMapping/SEARCH_CONFIGMAPPINGS',
  FETCH_CONFIGMAPPING_LIST: 'configMapping/FETCH_CONFIGMAPPING_LIST',
  FETCH_CONFIGMAPPING: 'configMapping/FETCH_CONFIGMAPPING',
  CREATE_CONFIGMAPPING: 'configMapping/CREATE_CONFIGMAPPING',
  UPDATE_CONFIGMAPPING: 'configMapping/UPDATE_CONFIGMAPPING',
  DELETE_CONFIGMAPPING: 'configMapping/DELETE_CONFIGMAPPING',
  RESET: 'configMapping/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IConfigMapping>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ConfigMappingState = Readonly<typeof initialState>;

// Reducer

export default (state: ConfigMappingState = initialState, action): ConfigMappingState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_CONFIGMAPPINGS):
    case REQUEST(ACTION_TYPES.FETCH_CONFIGMAPPING_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CONFIGMAPPING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CONFIGMAPPING):
    case REQUEST(ACTION_TYPES.UPDATE_CONFIGMAPPING):
    case REQUEST(ACTION_TYPES.DELETE_CONFIGMAPPING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_CONFIGMAPPINGS):
    case FAILURE(ACTION_TYPES.FETCH_CONFIGMAPPING_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CONFIGMAPPING):
    case FAILURE(ACTION_TYPES.CREATE_CONFIGMAPPING):
    case FAILURE(ACTION_TYPES.UPDATE_CONFIGMAPPING):
    case FAILURE(ACTION_TYPES.DELETE_CONFIGMAPPING):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_CONFIGMAPPINGS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONFIGMAPPING_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONFIGMAPPING):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CONFIGMAPPING):
    case SUCCESS(ACTION_TYPES.UPDATE_CONFIGMAPPING):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CONFIGMAPPING):
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

const apiUrl = '/crawlerconfiguration/api/config-mappings';
const apiSearchUrl = '/crawlerconfiguration//api/_search/config-mappings';

// Actions

export const getSearchEntities: ICrudSearchAction<IConfigMapping> = query => ({
  type: ACTION_TYPES.SEARCH_CONFIGMAPPINGS,
  payload: axios.get<IConfigMapping>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IConfigMapping> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_CONFIGMAPPING_LIST,
    payload: axios.get<IConfigMapping>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IConfigMapping> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CONFIGMAPPING,
    payload: axios.get<IConfigMapping>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IConfigMapping> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CONFIGMAPPING,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IConfigMapping> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CONFIGMAPPING,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IConfigMapping> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CONFIGMAPPING,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
