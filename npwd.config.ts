import App from './src/App';
import { HouseIcon } from './icon';
import { theme, HOUSE_APP_PRIMARY_COLOR } from './src/app.theme';

export const externalAppConfig = () => ({
  id: 'housing',
  nameLocale: 'Properties',
  color: '#fff',
  backgroundColor: HOUSE_APP_PRIMARY_COLOR,
  path: '/housing',
  icon: HouseIcon,
  app: App,
  theme: theme,
});

export default externalAppConfig;