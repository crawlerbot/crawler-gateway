import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-simlife';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';
import { ISiteChannel, defaultValue } from 'app/shared/model/CrawlerConfiguration/site-channel.model';

export const ACTION_TYPES = {
  SEARCH_SITECHANNELS: 'siteChannel/SEARCH_SITECHANNELS',
  FETCH_SITECHANNEL_LIST: 'siteChannel/FETCH_SITECHANNEL_LIST',
  FETCH_SITECHANNEL: 'siteChannel/FETCH_SITECHANNEL',
  CREATE_SITECHANNEL: 'siteChannel/CREATE_SITECHANNEL',
  UPDATE_SITECHANNEL: 'siteChannel/UPDATE_SITECHANNEL',
  DELETE_SITECHANNEL: 'siteChannel/DELETE_SITECHANNEL',
  RESET: 'siteChannel/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISiteChannel>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type SiteChannelState = Readonly<typeof initialState>;

// Reducer

export default (state: SiteChannelState = initialState, action): SiteChannelState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_SITECHANNELS):
    case REQUEST(ACTION_TYPES.FETCH_SITECHANNEL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SITECHANNEL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SITECHANNEL):
    case REQUEST(ACTION_TYPES.UPDATE_SITECHANNEL):
    case REQUEST(ACTION_TYPES.DELETE_SITECHANNEL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_SITECHANNELS):
    case FAILURE(ACTION_TYPES.FETCH_SITECHANNEL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SITECHANNEL):
    case FAILURE(ACTION_TYPES.CREATE_SITECHANNEL):
    case FAILURE(ACTION_TYPES.UPDATE_SITECHANNEL):
    case FAILURE(ACTION_TYPES.DELETE_SITECHANNEL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_SITECHANNELS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SITECHANNEL_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SITECHANNEL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SITECHANNEL):
    case SUCCESS(ACTION_TYPES.UPDATE_SITECHANNEL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SITECHANNEL):
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

const apiUrl = '/crawlerconfiguration/api/site-channels';
const apiSearchUrl = '/crawlerconfiguration//api/_search/site-channels';

// Actions

export const getSearchEntities: ICrudSearchAction<ISiteChannel> = query => ({
  type: ACTION_TYPES.SEARCH_SITECHANNELS,
  payload: axios.get<ISiteChannel>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<ISiteChannel> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_SITECHANNEL_LIST,
    payload: axios.get<ISiteChannel>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ISiteChannel> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SITECHANNEL,
    payload: axios.get<ISiteChannel>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISiteChannel> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SITECHANNEL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISiteChannel> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SITECHANNEL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISiteChannel> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SITECHANNEL,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
