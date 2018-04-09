// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withRouter } from 'react-router';

import BaseLayout from '../../components/BaseLayout';
import ArticleList from '../../components/ArticleList';
import fetchFeed from '../../actions/feed';
import NotFound from '../../components/NotFound';
import { host, slugToTitle } from '../../utils/helpers';

type Props = {
  feed: Array<Object>,
  fetchFeed: Function,
  isLoading: boolean,
  match: Object,
};

const getCategoryArticle = (feed, category) => {
  const data = feed;
  return data.filter((item) => {
    const slug = [];
    /* eslint array-callback-return: 0 */
    item.categories.map((cat) => {
      slug.push(cat.slug);
    });
    return slug.includes(category);
  });
};

class CategoryContainer extends React.PureComponent<Props> {
  static defaultProps = {
    feed: [],
  }

  componentDidMount() {
    this.props.fetchFeed();
  }

  render() {
    const { feed, match, isLoading } = this.props;
    const { slug } = match.params;

    const posts = getCategoryArticle(feed, slug);

    return (
      <BaseLayout
        title={`React PWA WWWID - ${slugToTitle(slug)}`}
        canonical={`${host}/categories/${slug}`}
      >
        <ArticleList data={posts} isLoading={isLoading} />
        {(posts.length === 0 && !isLoading) && <NotFound />}
      </BaseLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    feed: state.feedReducer.feed,
    isLoading: state.feedReducerIsLoading,
    hasErrored: state.feedReducerHasErrored,
    hasFailed: state.feedReducerHasFailed,
  };
}

export default compose(
  withRouter,
  connect(mapStateToProps, { fetchFeed }),
)(CategoryContainer);
