import { JSX } from 'antd/react/jsx-runtime';

declare module 'antd/react/jsx-runtime' {
  namespace JSX {
    type ElementType = React.JSX.ElementType;
  }
}
