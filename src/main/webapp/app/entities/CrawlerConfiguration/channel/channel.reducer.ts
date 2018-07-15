import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-simlife';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';
import { IChannel, defaultValue } from 'app/shared/model/CrawlerConfiguration/channel.model';

export const ACTION_TYPES = {
  SEARCH_CHANNELS: 'channel/SEARCH_CHANNELS',
  FETCH_CHANNEL_LIST: 'channel/FETCH_CHANNEL_LIST',
  FETCH_CHANNEL: 'channel/FETCH_CHANNEL',
  CREATE_CHANNEL: 'channel/CREATE_CHANNEL',
  UPDATE_CHANNEL: 'channel/UPDATE_CHANNEL',
  DELETE_CHANNEL: 'channel/DELETE_CHANNEL',
  RESET: 'channel/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IChannel>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ChannelState = Readonly<typeof initialState>;

// Reducer

export default (state: ChannelState = initialState, action): ChannelState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_CHANNELS):
    case REQUEST(ACTION_TYPES.FETCH_CHANNEL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CHANNEL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CHANNEL):
    case REQUEST(ACTION_TYPES.UPDATE_CHANNEL):
    case REQUEST(ACTION_TYPES.DELETE_CHANNEL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_CHANNELS):
    case FAILURE(ACTION_TYPES.FETCH_CHANNEL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CHANNEL):
    case FAILURE(ACTION_TYPES.CREATE_CHANNEL):
    case FAILURE(ACTION_TYPES.UPDATE_CHANNEL):
    case FAILURE(ACTION_TYPES.DELETE_CHANNEL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_CHANNELS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHANNEL_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHANNEL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CHANNEL):
    case SUCCESS(ACTION_TYPES.UPDATE_CHANNEL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CHANNEL):
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

const apiUrl = '/crawlerconfiguration/api/channels';
const apiSearchUrl = '/crawlerconfiguration//api/_search/channels';

// Actions

export const getSearchEntities: ICrudSearchAction<IChannel> = query => ({
  type: ACTION_TYPES.SEARCH_CHANNELS,
  payload: axios.get<IChannel>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IChannel> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_CHANNEL_LIST,
    payload: axios.get<IChannel>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IChannel> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CHANNEL,
    payload: axios.get<IChannel>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IChannel> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CHANNEL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IChannel> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CHANNEL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IChannel> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CHANNEL,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
