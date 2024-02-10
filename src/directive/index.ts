export interface IDirectiveHandle {
  create?: (value: any, props: any) => boolean | undefined;
  show?: (ref: HTMLElement, value: any, props: any, prevProps?: any) => void;
  hidden?: (ref: HTMLElement, value: any, props: any, prevProps?: any) => void;
  mounted?: (ref: HTMLElement, value: any, props: any, prevProps?: any) => void;
}

export type IDirectiveMapType = 'v-if' | 'v-show';

const directiveMap: Map<IDirectiveMapType, IDirectiveHandle> = new Map();

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

const hiddenStyle = {
  display: 'none',
};

export const directive = (name: IDirectiveMapType, hanlde: IDirectiveHandle): void => {
  if (name) {
    directiveMap.set(name, hanlde);
  }
};

export { directiveMap };
