export const host = 'https://react-pwa-id.firebaseapp.com';

export const getId = (str) => {
  const string = str.split('/');
  return string[string.length - 1];
};

export const titleToSlug = (str) => {
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

export const slugToTitle = (slug) => {
  const words = slug.split('-');

  for (let i = 0; i < words.length; i += 1) {
    const word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);
  }

  return words.join(' ');
};

export const getExcerpt = (text, limit = 0, except = '...') => {
  let content = text;
  content = content.split(/<\s*p[^>]*>([^<]*)<\s*\/\s*p\s*>/);
  content = content.filter(v => v.length > 100);
  content = content[0].replace(/<[^>]+>/g, '');
  return content.substring(0, limit) + except;
};

export const getAllCategories = (params) => {
  const items = params;
  let categories = items.map(item => item.categories);
  categories = [].concat(...categories);
  const setCategories = new Set(categories);
  const sorted = Array.from(setCategories).sort();
  const objects = sorted.map((item, index) => ({
    id: index,
    slug: item,
    title: slugToTitle(item),
  }));

  return objects;
};

export const WebpIsSupported = (callback) => {
  // If the browser doesn't has the method createImageBitmap, you can't display webp format
  if (!window.createImageBitmap) {
    callback(false);
    return;
  }

  // Base64 representation of a white point image
  const webpdata = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA=';

  // Retrieve the Image in Blob Format
  fetch(webpdata).then(response => response.blob()).then((blob) => {
    // If the createImageBitmap method succeeds, return true, otherwise false
    createImageBitmap(blob).then(() => {
      callback(true);
    }, () => {
      callback(false);
    });
  });
};

export const getCloudinaryImage = (img) => {
  let widthSize = 0;
  let heightSize;
  let imageType = 'jpg';

  WebpIsSupported((isSupported) => {
    if (isSupported) {
      imageType = 'webp';
    }
  });

  if (window.screen.width >= 860) {
    widthSize = 332;
    heightSize = 186;
  } else if (window.screen.width >= 640 && window.screen.width < 860) {
    widthSize = 250;
    heightSize = 140;
  } else {
    widthSize = 96;
    heightSize = 54;
  }

  const fetchUrl = `https://res.cloudinary.com/rizalibnu/image/fetch/c_fill,g_auto:face,h_${heightSize},w_${widthSize},fl_force_strip.progressive/f_${imageType}/`;

  return fetchUrl + img;
};
