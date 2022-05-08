import { registerMicroApps, start } from 'qiankun';
import { createApp } from 'vue';
import App from './App.vue';
import { qiankunApp } from './constants';
import router from './router';
import useEventBus from './utils/eventBus';

const [event] = useEventBus();

registerMicroApps(qiankunApp.map((item: {
  name: string;
  entry: string;
  container: string;
  activeRule: string;
}) => {
  return {
    ...item,
    props: {
      userPro: 'react-qiankun',
      entry: item.entry,
    }
  };
}), {
  beforeLoad: (app) => {
    console.log('before load', app.name);
    event.emit('qiankun-child-loading', true);
    return new Promise<void>((resolve) => {
      resolve();
    });
  },
  afterMount: (app) => {
    console.log('after mount', app.name);
    event.emit('qiankun-child-loading', false);
    return new Promise<void>((resolve) => {
      resolve();
    });
  },
});
// 启动 qiankun
start();

createApp(App).use(router).mount('#app')
