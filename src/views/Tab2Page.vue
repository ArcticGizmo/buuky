<template>
  <BaseTabPage title="Reading"
    >Reading list and timers Outlines what you are getting up to and the such

    <IonButton @click="getAllUsers()">Load Users</IonButton>
    <IonButton @click="onAddUser()">Add User</IonButton>
    <pre>{{ users }}</pre>
  </BaseTabPage>
</template>

<script setup lang="ts">
import { Ref, computed, getCurrentInstance, onBeforeUnmount, onMounted, ref } from 'vue';
import BaseTabPage from './base/BaseTabPage.vue';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { User } from '@/models/user';
import { Toast } from '@capacitor/toast';
import { useQuerySQLite } from '@/composables/useQuerySQLite';
import { IonButton } from '@ionic/vue';
import SQLiteService from '@/services/sqliteService';
import StorageService from '@/services/storageService';

const dbNameRef = ref('');
const isInitComplete = ref(false);
const isDatabase = ref(false);
const users = ref<User[]>([]);
const db: Ref<SQLiteDBConnection | null> = ref(null);
const appInstance = getCurrentInstance();

const sqliteServ: SQLiteService = appInstance?.appContext.config.globalProperties.$sqliteServ;
const storageServ: StorageService = appInstance?.appContext.config.globalProperties.$storageServ;

const dbInitialized = computed(() => !!db.value);
const platform = sqliteServ.getPlatform();

const getAllUsers = async () => {
  const stmt = 'SELECT * FROM users';
  const values: any[] = [];
  const fetchData = await useQuerySQLite(db, stmt, values);
  users.value = fetchData;
};

const onAddUser = async () => {
  console.dir('----a');
  if (!db.value) {
    console.dir('----invaliud');
    return;
  }

  const newUser: User = {
    id: 1,
    name: 'geoff',
    active: 1
  };

  const isConn = await sqliteServ.isConnection(dbNameRef.value, false);
  const lastId = await storageServ.addUser(newUser);
  newUser.id = lastId;
  users.value.push(newUser as never);
  console.dir('---yep');
};

const openDatabase = async () => {
  try {
    const dbUsersName = storageServ.getDatabaseName();
    dbNameRef.value = dbUsersName;
    const version = storageServ.getDatabaseVersion();

    const database = await sqliteServ.openDatabase(dbUsersName, version, false);
    db.value = database;
    isDatabase.value = true;
  } catch (error) {
    const msg = `Error open database: ${error}`;
    console.error(msg);
    Toast.show({
      text: msg,
      duration: 'long'
    });
  }
};
onMounted(() => {
  const initSubscription = storageServ.isInitCompleted.subscribe(async (value: boolean) => {
    isInitComplete.value = value;
    if (isInitComplete.value === true) {
      const dbUsersName = storageServ.getDatabaseName();
      if (platform === 'web') {
        customElements
          .whenDefined('jeep-sqlite')
          .then(async () => {
            await openDatabase();
          })
          .catch(error => {
            const msg = `Error open database: ${error}`;
            console.log(msg);
            Toast.show({
              text: msg,
              duration: 'long'
            });
          });
      } else {
        await openDatabase();
      }
    }
  });
});
onBeforeUnmount(() => {
  sqliteServ
    .closeDatabase(dbNameRef.value, false)
    .then(() => {
      isDatabase.value = false;
    })
    .catch((error: any) => {
      const msg = `Error close database:
                          ${error.message ? error.message : error}`;
      console.error(msg);
      Toast.show({
        text: msg,
        duration: 'long'
      });
    });
});
</script>
