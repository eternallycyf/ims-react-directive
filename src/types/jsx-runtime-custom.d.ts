import 'react';

type WithIntrinsicAttributesProps = {
  'v-if'?: boolean;
  'v-show'?: boolean;
};

// unpack all here to avoid infinite self-referencing when defining our own JSX namespace
type ReactJSXElement = JSX.Element | react.ReactNode;
type ReactJSXElementClass = JSX.ElementClass;
type ReactJSXElementAttributesProperty = JSX.ElementAttributesProperty;
type ReactJSXElementChildrenAttribute = JSX.ElementChildrenAttribute;
type ReactJSXLibraryManagedAttributes<C, P> = JSX.LibraryManagedAttributes<C, P>;
type ReactJSXIntrinsicAttributes = JSX.IntrinsicAttributes;
type ReactJSXIntrinsicClassAttributes<T> = JSX.IntrinsicClassAttributes<T>;
type ReactJSXIntrinsicElements = JSX.IntrinsicElements;

export namespace CJSX {
  interface Element extends ReactJSXElement {}
  interface ElementClass extends ReactJSXElementClass {}
  interface ElementAttributesProperty extends ReactJSXElementAttributesProperty {}
  interface ElementChildrenAttribute extends ReactJSXElementChildrenAttribute {}

  type LibraryManagedAttributes<C, P> = WithIntrinsicAttributesProps &
    ReactJSXLibraryManagedAttributes<C, P>;

  type IntrinsicAttributes = ReactJSXIntrinsicAttributes & WithIntrinsicAttributesProps;

  interface IntrinsicClassAttributes<T> extends ReactJSXIntrinsicClassAttributes<T> {}

  type IntrinsicElements = ReactJSXIntrinsicElements & WithIntrinsicAttributesProps;
}
