import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'cl.euroamerica.rentasvitalicias',
  webDir: 'www',
  server: {
    cleartext: true,
    androidScheme: 'https'
  },
  android: {
    allowMixedContent: true
  },
};

export default config;
