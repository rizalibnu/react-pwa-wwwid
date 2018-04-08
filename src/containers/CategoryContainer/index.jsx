// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withRouter } from 'react-router';

import BaseLayout from '../../components/BaseLayout';
import ArticleList from '../../components/ArticleList';
import fetchFeed from '../../actions/feed';
import NotFound from '../../components/NotFound';

type Props = {
  feed: Array<Object>,
  fetchFeed: Function,
  isLoading: boolean,
};

const getCategoryArticle = (feed, category) => {
  const data = feed;
  return data.filter(item => {
    let slug = [];
    /* eslint array-callback-return: 0 */
    item.categories.map(category => {
      slug.push(category.slug);
    })
    return slug.includes(category);
  })
}

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
      <BaseLayout>
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
