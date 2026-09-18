import type React from 'react';

type WithDirectives = {
  'v-if'?: boolean;
  'v-show'?: boolean;
};

type MergeDirectives<P> = P & WithDirectives;

export namespace CJSX {
  type Element = React.JSX.Element;
  type ElementClass = React.JSX.ElementClass;
  type ElementAttributesProperty = React.JSX.ElementAttributesProperty;
  type ElementChildrenAttribute = React.JSX.ElementChildrenAttribute;
  type ElementType = React.JSX.ElementType;

  type LibraryManagedAttributes<C, P> = MergeDirectives<
    React.JSX.LibraryManagedAttributes<C, P>
  >;

  type IntrinsicAttributes = React.JSX.IntrinsicAttributes & WithDirectives;
  type IntrinsicClassAttributes<T> = React.JSX.IntrinsicClassAttributes<T>;

  type IntrinsicElements = {
    [K in keyof React.JSX.IntrinsicElements]: MergeDirectives<React.JSX.IntrinsicElements[K]>;
  };
}
