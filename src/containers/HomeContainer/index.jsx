// @flow
import * as React from 'react';
import { connect } from 'react-redux';

import BaseLayout from '../../components/BaseLayout';
import ArticleList from '../../components/ArticleList';
import fetchFeed from '../../actions/feed';

type Props = {
  feed: Array<Object>,
  fetchFeed: Function,
};

class HomeContainer extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.fetchFeed();
  }

  render() {
    const { feed } = this.props;

    return (
      <BaseLayout>
        <ArticleList data={feed} />
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

export default connect(mapStateToProps, { fetchFeed })(HomeContainer);
