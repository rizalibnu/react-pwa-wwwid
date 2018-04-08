// @flow
import * as React from 'react';

import BaseLayout from '../../components/BaseLayout';

type Props = {};

/* eslint react/prefer-stateless-function: 0 */
class NotFoundContainer extends React.PureComponent<Props> {
  render() {
    return (
      <BaseLayout>
        <div>Halaman tidak ditemukan</div>
      </BaseLayout>
    );
  }
}

export default NotFoundContainer;
