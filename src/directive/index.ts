export interface IDirectiveHandle {
  create?: (value: any, props: any) => boolean | undefined;
  show?: (ref: HTMLElement, value: any, props: any, prevProps?: any) => void;
  hidden?: (ref: HTMLElement, value: any, props: any, prevProps?: any) => void;
  mounted?: (ref: HTMLElement, value: any, props: any, prevProps?: any) => void;
}

export type IDirectiveMapType = 'v-if' | 'v-show';

const directiveMap: Map<IDirectiveMapType, IDirectiveHandle> = new Map();

const hiddenStyle = {
  display: 'none',
};

directiveMap
  .set('v-if', {
    create: (value) => {
      if (!value) return false;
    },
  })
  .set('v-show', {
    create: (value, props) => {
      if (!value) {
        if (props.style) {
          props.style.display = 'none';
        } else {
          props.style = hiddenStyle;
        }
        return false;
      }
      return true;
    },
  });

/** Register or override a directive handler by name. */
export const directive = (name: IDirectiveMapType, handle: IDirectiveHandle): void => {
  if (name) {
    directiveMap.set(name, handle);
  }
};

export { directiveMap };
