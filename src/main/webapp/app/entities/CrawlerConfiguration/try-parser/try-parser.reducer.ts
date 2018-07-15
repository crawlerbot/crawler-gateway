import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-simlife';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';
import { ITryParser, defaultValue } from 'app/shared/model/CrawlerConfiguration/try-parser.model';

export const ACTION_TYPES = {
  SEARCH_TRYPARSERS: 'tryParser/SEARCH_TRYPARSERS',
  FETCH_TRYPARSER_LIST: 'tryParser/FETCH_TRYPARSER_LIST',
  FETCH_TRYPARSER: 'tryParser/FETCH_TRYPARSER',
  CREATE_TRYPARSER: 'tryParser/CREATE_TRYPARSER',
  UPDATE_TRYPARSER: 'tryParser/UPDATE_TRYPARSER',
  DELETE_TRYPARSER: 'tryParser/DELETE_TRYPARSER',
  SET_BLOB: 'tryParser/SET_BLOB',
  RESET: 'tryParser/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITryParser>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type TryParserState = Readonly<typeof initialState>;

// Reducer

export default (state: TryParserState = initialState, action): TryParserState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_TRYPARSERS):
    case REQUEST(ACTION_TYPES.FETCH_TRYPARSER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TRYPARSER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TRYPARSER):
    case REQUEST(ACTION_TYPES.UPDATE_TRYPARSER):
    case REQUEST(ACTION_TYPES.DELETE_TRYPARSER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_TRYPARSERS):
    case FAILURE(ACTION_TYPES.FETCH_TRYPARSER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TRYPARSER):
    case FAILURE(ACTION_TYPES.CREATE_TRYPARSER):
    case FAILURE(ACTION_TYPES.UPDATE_TRYPARSER):
    case FAILURE(ACTION_TYPES.DELETE_TRYPARSER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_TRYPARSERS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRYPARSER_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRYPARSER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TRYPARSER):
    case SUCCESS(ACTION_TYPES.UPDATE_TRYPARSER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TRYPARSER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB:
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = '/crawlerconfiguration/api/try-parsers';
const apiSearchUrl = '/crawlerconfiguration//api/_search/try-parsers';

// Actions

export const getSearchEntities: ICrudSearchAction<ITryParser> = query => ({
  type: ACTION_TYPES.SEARCH_TRYPARSERS,
  payload: axios.get<ITryParser>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<ITryParser> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_TRYPARSER_LIST,
    payload: axios.get<ITryParser>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ITryParser> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TRYPARSER,
    payload: axios.get<ITryParser>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITryParser> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TRYPARSER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITryParser> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TRYPARSER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITryParser> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TRYPARSER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
