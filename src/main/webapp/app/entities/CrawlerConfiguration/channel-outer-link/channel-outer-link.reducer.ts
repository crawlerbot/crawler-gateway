import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-simlife';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';
import { IChannelOuterLink, defaultValue } from 'app/shared/model/CrawlerConfiguration/channel-outer-link.model';

export const ACTION_TYPES = {
  SEARCH_CHANNELOUTERLINKS: 'channelOuterLink/SEARCH_CHANNELOUTERLINKS',
  FETCH_CHANNELOUTERLINK_LIST: 'channelOuterLink/FETCH_CHANNELOUTERLINK_LIST',
  FETCH_CHANNELOUTERLINK: 'channelOuterLink/FETCH_CHANNELOUTERLINK',
  CREATE_CHANNELOUTERLINK: 'channelOuterLink/CREATE_CHANNELOUTERLINK',
  UPDATE_CHANNELOUTERLINK: 'channelOuterLink/UPDATE_CHANNELOUTERLINK',
  DELETE_CHANNELOUTERLINK: 'channelOuterLink/DELETE_CHANNELOUTERLINK',
  RESET: 'channelOuterLink/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IChannelOuterLink>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ChannelOuterLinkState = Readonly<typeof initialState>;

// Reducer

export default (state: ChannelOuterLinkState = initialState, action): ChannelOuterLinkState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_CHANNELOUTERLINKS):
    case REQUEST(ACTION_TYPES.FETCH_CHANNELOUTERLINK_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CHANNELOUTERLINK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CHANNELOUTERLINK):
    case REQUEST(ACTION_TYPES.UPDATE_CHANNELOUTERLINK):
    case REQUEST(ACTION_TYPES.DELETE_CHANNELOUTERLINK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_CHANNELOUTERLINKS):
    case FAILURE(ACTION_TYPES.FETCH_CHANNELOUTERLINK_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CHANNELOUTERLINK):
    case FAILURE(ACTION_TYPES.CREATE_CHANNELOUTERLINK):
    case FAILURE(ACTION_TYPES.UPDATE_CHANNELOUTERLINK):
    case FAILURE(ACTION_TYPES.DELETE_CHANNELOUTERLINK):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_CHANNELOUTERLINKS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHANNELOUTERLINK_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHANNELOUTERLINK):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CHANNELOUTERLINK):
    case SUCCESS(ACTION_TYPES.UPDATE_CHANNELOUTERLINK):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CHANNELOUTERLINK):
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

const apiUrl = '/crawlerconfiguration/api/channel-outer-links';
const apiSearchUrl = '/crawlerconfiguration//api/_search/channel-outer-links';

// Actions

export const getSearchEntities: ICrudSearchAction<IChannelOuterLink> = query => ({
  type: ACTION_TYPES.SEARCH_CHANNELOUTERLINKS,
  payload: axios.get<IChannelOuterLink>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IChannelOuterLink> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_CHANNELOUTERLINK_LIST,
    payload: axios.get<IChannelOuterLink>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IChannelOuterLink> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CHANNELOUTERLINK,
    payload: axios.get<IChannelOuterLink>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IChannelOuterLink> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CHANNELOUTERLINK,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IChannelOuterLink> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CHANNELOUTERLINK,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IChannelOuterLink> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CHANNELOUTERLINK,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
