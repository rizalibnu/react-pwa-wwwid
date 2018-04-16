// @flow
import * as React from 'react';
import injectSheet from 'react-jss';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';

import NotFound from '../NotFound';

type Props = {
  classes: Object,
  data: Object,
  isLoading: boolean,
};

type State = {};

const styles = theme => ({
  wrapper: {
    padding: 18,
    maxWidth: 740,
    margin: [[20, 'auto']],
  },
  info: {
    fontSize: 13,
    marginRight: 6,
    color: theme.textMuted,
  },
  title: {
    '@media (min-width: 860px)': {
      fontSize: 38,
    },
  },
  heading: {
    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
  },
  content: {
    fontFamily: 'Georgia, serif',
    lineHeight: '1.8em',
    fontSize: 16,
    color: theme.baseColor,
    overflowWrap: 'break-word',
    '@media (min-width: 860px)': {
      fontSize: 21,
    },
    '& h3': {
      extend: 'heading',
      fontSize: 30,
      '@media (min-width: 860px)': {
        fontSize: 34,
      },
    },
    '& h4': {
      extend: 'heading',
      fontSize: 24,
      '@media (min-width: 860px)': {
        fontSize: 26,
      },
    },
    '& a': {
      color: theme.brandPrimary,
    },
    '& pre': {
      background: 'rgba(0,0,0,.05)',
      padding: 20,
      whiteSpace: 'pre-wrap',
      marginTop: 35,
      marginBottom: 0,
      fontSize: 14,
      '@media (min-width: 860px)': {
        fontSize: 16,
      },
    },
    '& pre+pre': {
      marginTop: 0,
      paddingTop: 4,
    },
    '& blockquote': {
      fontSize: 21,
      lineHeight: 1.4,
      letterSpacing: '-.005em',
      fontWeight: 400,
      fontStyle: 'italic',
      color: 'rgba(0,0,0,.58)',
      marginTop: 35,
      marginBottom: 35,
      fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
      '@media (min-width: 860px)': {
        fontSize: 30,
      },
    },
    '& ol': {
      padding: 0,
      listStyle: 'none',
      listStyleImage: 'none',
      counterReset: 'post',
      '& li': {
        marginLeft: 30,
        marginBottom: 14,
        '&:before': {
          paddingRight: 12,
          counterIncrement: 'post',
          content: 'counter(post) "."',
          position: 'absolute',
          display: 'inline-block',
          boxSizing: 'border-box',
          width: 78,
          marginLeft: -78,
          textAlign: 'right',
        },
      },
    },
  },
  tag: {
    margin: [[50, 0]],
  },
  tagLabel: {
    color: theme.baseColor,
    padding: 10,
    backgroundColor: '#eeeeee',
    borderRadius: 4,
    marginRight: 10,
    marginBottom: 10,
    display: 'inline-block',
    fontSize: 14,
    '&:last-child': {
      marginRight: 0,
    },
    '&:hover': {
      backgroundColor: '#dddddd',
    },
  },
});

class ArticleContent extends React.PureComponent<Props, State> {
  render() {
    const { classes, data, isLoading } = this.props;

    if (isLoading) {
      return (
        <div className={classes.wrapper}>
          <div className={classes.content}>
            <div className="placeholder" style={{ width: '100%' }} />
            <div className="placeholder" style={{ width: '100%' }} />
            <div className="placeholder" style={{ width: '50%' }} />
          </div>
        </div>
      );
    } else if (typeof data === 'undefined') {
      return <NotFound />;
    }

    return (
      <div className={classes.wrapper}>
        <div className={classes.info}>
          <span>
            {data.author}
          </span>
          <span> · </span>
          <span>
            {(new Date(data.pubDate)).toLocaleDateString()}
          </span>
        </div>
        <h1 className={classes.title}>
          {data.title}
        </h1>
        <div className={classes.content}>
          {ReactHtmlParser(data.description)}
        </div>
        <div className={classes.tag}>
          {data.categories.map(category => (
            <Link key={category.slug} to={`/categories/${category.slug}`} className={classes.tagLabel}>
              {category.title}
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(ArticleContent);
