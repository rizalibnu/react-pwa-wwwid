// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withRouter } from 'react-router';

import BaseLayout from '../../components/BaseLayout';
import ArticleList from '../../components/ArticleList';
import fetchFeed from '../../actions/feed';

type Props = {
  feed: Array<Object>,
  fetchFeed: Function,
};

const getCategoryArticle = (feed, category) => {
  const data = feed;
  return data.filter(item => {
    return item.categories.includes(category)
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
    const { feed, match } = this.props;
    const { slug } = match.params;
    const posts = getCategoryArticle(feed, slug);

    return (
      <BaseLayout>
        <ArticleList data={posts} />
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
