// @flow
import * as React from 'react';

import BaseLayout from '../../components/BaseLayout';
import NotFound from '../../components/NotFound';

type Props = {};

/* eslint react/prefer-stateless-function: 0 */
class NotFoundContainer extends React.PureComponent<Props> {
  render() {
    return (
      <BaseLayout>
        <NotFound />
      </BaseLayout>
    );
  }
}

export default NotFoundContainer;
