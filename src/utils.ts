import { clone, isFunction } from 'lodash';

import { IDirectiveHandle, directiveMap } from './directive';

interface Props {
  [key: string]: any;
}

const refMap = new WeakMap<HTMLElement, Props>();

export const isDOM = (element: HTMLElement): boolean => {
  return element instanceof HTMLElement;
};

export const hasOwnProperty = Object.prototype.hasOwnProperty;

function execHiddenDirective(props: Props, ref: HTMLElement) {
  directiveMap.forEach((handle: IDirectiveHandle, key: string) => {
    if (props && hasOwnProperty.call(props, key)) {
      handle?.hidden?.(ref, props[key], props, refMap.get(ref));
    }
  });
}

function execShowDirective(props: Props, ref: HTMLElement) {
  directiveMap.forEach((handle: IDirectiveHandle, key: string) => {
    if (props && hasOwnProperty.call(props, key)) {
      handle?.show?.(ref, props[key], props, refMap.get(ref));
    }
  });
}

export const transformProps = (props: Props) => {
  const originProps = clone(props);

  for (let [key, handle] of directiveMap) {
    if (props && hasOwnProperty.call(props, key)) {
      const value = props[key];
      if (handle?.create?.(value, props) === false) {
        return false;
      }
      delete props[key];
    }
  }

  const originRef = props.ref;

  props.ref = (ref: HTMLElement) => {
    if (!ref) return;

    const oldProps = refMap.get(ref);
    if (oldProps) {
      if (oldProps?.style?.display === 'none' && originProps?.style?.display !== 'none') {
        execShowDirective(originProps, ref);
      }

      if (oldProps?.style?.display !== 'none' && originProps?.style?.display === 'none') {
        execHiddenDirective(originProps, ref);
      }
    } else {
      directiveMap.forEach((handle: IDirectiveHandle, key: string) => {
        if (originProps && hasOwnProperty.call(originProps, key)) {
          handle?.mounted?.(ref, originProps[key], originProps, refMap.get(ref));
        }
      });

      if (originProps?.style?.display !== 'none') {
        execShowDirective(originProps, ref);
      } else {
        execHiddenDirective(originProps, ref);
      }
    }

    if (originRef) {
      if (isFunction(originRef)) {
        originRef(ref);
      } else if (hasOwnProperty.call(originRef, 'current')) {
        (originRef as { current: HTMLElement }).current = ref;
      }
    }

    refMap.set(ref, props);
  };
};
