import {createApp} from 'vue';
import { install as VueMonacoEditorPlugin } from '@guolao/vue-monaco-editor'
// @ts-ignore
import revel from '@rebilly/revel';
import './style.css';
import App from './App.vue';

import '@rebilly/revel/dist/style.css';

createApp(App)
  .use(revel)
  .use(VueMonacoEditorPlugin)
  .mount('#app');
