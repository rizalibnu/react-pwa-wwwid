import Moment from 'moment';
import 'moment/locale/id';

import {
  getId,
  titleToSlug,
  getExcerpt,
  slugToTitle,
  getCloudinaryImage,
  getAllCategories,
} from '../utils/helpers';

Moment.locale('id');

const defaultState = {
  feed: [],
};

export default function feedReducer(state = defaultState, action = {}) {
  switch (action.type) {
    case 'FETCH_FEED': {
      return {
        ...state,
        feed: action.payload.items.map(item => ({
          id: getId(item.guid),
          slug: titleToSlug(item.title),
          title: item.title,
          pubDateISO: item.pubDate,
          pubDate: Moment(Moment(item.pubDate).format('YYYYMMDD'), 'YYYYMMDD').fromNow(),
          author: item.author,
          thumbnail: getCloudinaryImage(item.thumbnail),
          categories: item.categories.map((category, index) => ({
            id: index,
            slug: category,
            title: slugToTitle(category),
          })),
          excerpt: getExcerpt(item.description, 140),
          description: item.description,
        })),
        categories: getAllCategories(action.payload.items),
      };
    }
    default:
      return state;
  }
}

export function feedReducerHasErrored(state = false, action) {
  switch (action.type) {
    case 'FETCH_FEED_HAS_ERRORED':
      return action.hasErrored;

    default:
      return state;
  }
}

export function feedReducerHasFailed(state = false, action) {
  switch (action.type) {
    case 'FETCH_FEED_HAS_FAILED':
      return action.hasFailed;

    default:
      return state;
  }
}

export function feedReducerIsLoading(state = false, action) {
  switch (action.type) {
    case 'FETCH_FEED_IS_LOADING':
      return action.isLoading;

    default:
      return state;
  }
}
