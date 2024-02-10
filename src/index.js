/**
 * the old `createElement` for build tool or React 16 which does not support automatic jsx-runtime.
 */

import React from 'react';

export function createElement() {
  return React.createElement.apply(undefined, args);
}

export const Fragment = React.Fragment;
