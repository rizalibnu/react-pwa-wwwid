// @flow
import * as React from 'react';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import { Lazy } from 'react-lazy';

type Props = {
  classes: Object,
  data: Array<Object>,
  isLoading: boolean,
};

type State = {};

const styles = theme => ({
  wrapper: {
    margin: [[20, 0]],
    padding: 18,
  },
  item: {
    display: 'flex',
    padding: [[18, 0]],
  },
  imageWrapper: {
    flexShrink: 0,
  },
  image: {
    objectFit: 'cover',
    display: 'inline-block',
    backgroundColor: 'rgba(0, 0, 0, 0.067)',
    width: 96,
    height: 54,
    '@media (min-width: 640px)': {
      width: 250,
      height: 140,
    },
    '@media (min-width: 860px)': {
      width: 332,
      height: 186,
    },
  },
  bodyWrapper: {
    paddingLeft: 18,
    flex: '1 1 auto',
  },
  title: {
    composes: 'heading',
    lineHeight: 1,
    '& a': {
      fontSize: 18,
      color: theme.baseColor,
    },
    '@media (min-width: 640px)': {
      lineHeight: 1.5,
      '& a': {
        fontSize: 21,
      },
    },
  },
  excerpt: {
    position: 'absolute',
    opacity: 0,
    pointerEvents: 'none',
    left: '-999em',
    lineHeight: 1.6,
    margin: [[18, 0]],
    '@media (min-width: 640px)': {
      position: 'static',
      opacity: 1,
      pointerEvents: 'auto',
      color: theme.textMuted,
    },
  },
  info: {
    fontSize: 13,
    marginRight: 6,
    color: theme.textMuted,
  },
});

class ArticleList extends React.PureComponent<Props, State> {
  render() {
    const { classes, data, isLoading } = this.props;
    const placeholderItems = Array.from(Array(3).keys());

    if (isLoading) {
      return (
        <div className={classes.wrapper}>
          {placeholderItems.map(index => (
            <div key={index} className={classes.item}>
              <div className={classes.imageWrapper}>
                <div className={classes.image} />
              </div>
              <div className={classes.bodyWrapper}>
                <div className="placeholder" style={{ width: '100%' }} />
                <div className={classes.excerpt}>
                  <div className="placeholder" style={{ width: '100%' }} />
                  <div className="placeholder" style={{ width: '70%' }} />
                </div>
                <div className={classes.info}>
                  <div className="placeholder" style={{ width: '50%' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    const item = (
      <React.Fragment>
        {data.map((post, key) => (
          <div key={key.toString()} className={classes.item}>
            <div className={classes.imageWrapper}>
              <Link to={`/articles/${post.slug}`}>
                <Lazy ltIE9 className={classes.image}>
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className={classes.image}
                  />
                </Lazy>
              </Link>
            </div>
            <div className={classes.bodyWrapper}>
              <h2 className={classes.title}>
                <Link to={`/articles/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>
              <div className={classes.excerpt}>
                {post.excerpt}
              </div>
              <div className={classes.info}>
                <span>
                  {post.author}
                </span>
                <span> · </span>
                <span>
                  {(new Date(post.pubDate)).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </React.Fragment>
    );

    return (
      <div className={classes.wrapper}>
        {item}
      </div>
    );
  }
}

export default injectSheet(styles)(ArticleList);
