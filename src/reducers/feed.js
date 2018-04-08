import Moment from 'moment';
import 'moment/locale/id';

Moment.locale('id');

const defaultState = {
  feed: [],
};

const getId = (str) => {
  const string = str.split('/');
  return string[string.length - 1];
};

const titleToSlug = (str) => {
  let string = str;
  string = string.replace(/^\s+|\s+$/g, ''); // trim
  string = string.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
  const to = 'aaaaeeeeiiiioooouuuunc------';

  for (let i = 0, l = from.length; i < l; i += 1) {
    string = string.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  string = string.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return string;
};

const getExcerpt = (text, limit = 0, except = '...') => {
  let content = text;
  content = content.split(/<\s*p[^>]*>([^<]*)<\s*\/\s*p\s*>/);
  content = content.filter(v => v.length > 100);
  content = content[0].replace(/<[^>]+>/g, '');
  return content.substring(0, limit) + except;
};

const slugToTitle = (slug) => {
  const words = slug.split('-');

  for (let i = 0; i < words.length; i += 1) {
    const word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);
  }

  return words.join(' ');
};

const getAllCategories = (params) => {
  const items = params;
  let categories = items.map(item => item.categories);
  categories = [].concat(...categories);
  const setCat = new Set(categories);
  const sorted = Array.from(setCat).sort();
  const objects = sorted.map((item, index) => ({
    id: index,
    slug: item,
    title: slugToTitle(item),
  }));

  return objects;
};

const getCloudinaryImage = (img) => {
  const widthSize = window.screen.width >= 860 ? 332 : window.screen.width >= 640 && window.screen.width < 860 ? 250 : 96;
  const heightSize = window.screen.width >= 860 ? 186 : window.screen.width >= 640 && window.screen.width < 860 ? 140 : 54;
  const fetchUrl = `https://res.cloudinary.com/rizalibnu/image/fetch/c_fill,g_auto:face,h_${heightSize},w_${widthSize},fl_force_strip.progressive/f_webp/`;

  return fetchUrl + img;
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
