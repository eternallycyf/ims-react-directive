import { Fragment, jsx as jsx_, jsxs as jsxs_ } from 'react/jsx-runtime';
import { transformProps } from '../utils';

import '../directive';

function jsx(type, config, maybeKey, source, self) {
  // 如果返回false，则表示不渲染组件
  if (transformProps(config) === false) {
    return null;
  }

  return jsx_(type, config, maybeKey, source, self);
}

function jsxs(type, config, maybeKey, source, self) {
  // 如果返回false，则表示不渲染组件
  if (transformProps(config) === false) {
    return null;
  }

  return jsxs_(type, config, maybeKey, source, self);
}

export { Fragment, jsx, jsxs };
