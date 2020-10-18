import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import '@testing-library/jest-dom/extend-expect';
import { CatalogList } from './CatalogList';

describe('Catalog tests', () => {
  it('Section renders properly', () => {
    const CatalogListComponent = render(
      <Provider store={store}>
        <CatalogList />
      </Provider>
    );
    expect(CatalogListComponent).toMatchSnapshot();
  });
});
