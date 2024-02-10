import { Button } from 'antd';

const App = () => {
  return (
    <div>
      <div v-show={true}>v-show</div>
      <div v-show={false}>v-show</div>
      <div v-if={true}>v-if</div>
      <div v-if={false}>v-if</div>
    </div>
  );
};

export default () => {
  return (
    <div>
      <App v-if={true} />
      <Button v-if={false}>ss</Button>
    </div>
  );
};
