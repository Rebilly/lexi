import {createApp} from 'vue';
// @ts-ignore
import revel from '@rebilly/revel';
import './style.css';
import App from './App.vue';

import '@rebilly/revel/dist/style.css';

createApp(App).use(revel).mount('#app');
