// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withRouter } from 'react-router';

import BaseLayout from '../../components/BaseLayout';
import ArticleContent from '../../components/ArticleContent';
import fetchFeed from '../../actions/feed';

type Props = {
  feed: Array<Object>,
  fetchFeed: Function,
  match: Object,
};

class ArticleContainer extends React.PureComponent<Props> {
  static defaultProps = {
    feed: [],
  }

  componentDidMount() {
    this.props.fetchFeed();
  }

  render() {
    const { feed, match } = this.props;
    const { slug } = match.params;
    const post = feed.find(item => item.slug === slug);

    if (typeof post === 'undefined') return null;

    return (
      <BaseLayout>
        <ArticleContent data={post} />
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
)(ArticleContainer);
