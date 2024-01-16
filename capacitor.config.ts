import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.arcticgizmo.buuky',
  appName: 'buuky',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
