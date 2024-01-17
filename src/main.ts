import { createApp, reactive } from 'vue';
import App from './App.vue';
import router from './router';
import VueVirtualScroller from 'vue-virtual-scroller';
import { VueQueryPlugin } from '@tanstack/vue-query';

import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

import { Capacitor } from '@capacitor/core';
import { JeepSqlite } from 'jeep-sqlite/dist/components/jeep-sqlite';
import SqliteService from './services/sqliteService';
import DbVersionService from './services/dbVersionService';
import StorageService from './services/storageService';
import InitialiseAppService from './services/initialiseAppService';

customElements.define('jeep-sqlite', JeepSqlite);
const platform = Capacitor.getPlatform();

const app = createApp(App).use(IonicVue).use(router).use(VueVirtualScroller).use(VueQueryPlugin);

// Set the platform as global properties on the app
app.config.globalProperties.$platform = platform;

// Define and instantiate the required services
const sqliteServ = new SqliteService();
const dbVersionServ = new DbVersionService();
const storageServ = new StorageService(sqliteServ, dbVersionServ);
// Set the services as global properties on the app
app.config.globalProperties.$sqliteServ = sqliteServ;
app.config.globalProperties.$dbVersionServ = dbVersionServ;
app.config.globalProperties.$storageServ = storageServ;
// Set the isPassphrase to false as global property
const globalState = reactive({
  isPassphrase: false,
  isNative: platform === 'web' ? false : true
});
// Provide the global state to all components
app.config.globalProperties.$globalState = globalState;
//Define and instantiate the InitializeAppService
const initAppServ = new InitialiseAppService(sqliteServ, storageServ);

const mountApp = () => {
  initAppServ
    .initializeApp(globalState)
    .then(() => {
      router.isReady().then(() => {
        app.mount('#app');
      });
    })
    .catch(error => {
      console.error('App Initialization error:', error);
    });
};

if (platform !== 'web') {
  mountApp();
} else {
  window.addEventListener('DOMContentLoaded', async () => {
    const jeepEl = document.createElement('jeep-sqlite');
    document.body.appendChild(jeepEl);
    customElements
      .whenDefined('jeep-sqlite')
      .then(() => {
        mountApp();
      })
      .catch(err => {
        console.error('jeep-sqlite creation error:', err);
      });
  });
}
