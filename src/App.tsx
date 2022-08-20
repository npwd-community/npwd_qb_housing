import React from 'react';
import { NuiProvider } from 'react-fivem-hooks';
import styled from 'styled-components';
import { IPhoneSettings } from '@project-error/npwd-types';
import { i18n } from 'i18next';
import { Theme, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { RecoilRoot } from 'recoil';
import Header from './components/Header';
import { PhoneSnackbar } from './snackbar/PhoneSnackbar';
import SnackbarProvider from './snackbar/SnackbarProvider';
import HousingNavBar from './components/HousingNavBar';
import { Switch, Route } from 'react-router-dom';
import HouseList from './components/HouseList/HouseList';
import KeyList from './components/KeyList/KeyList';
import Modal from './components/HouseList/modal/Modal';
import ModalBackground from './components/HouseList/modal/ModalBackground';

const Container = styled.div<{ isDarkMode: any }>`
  flex: 1;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  overflow: auto;
  max-height: 100%;
  background-color: #fafafa;
  ${({ isDarkMode }) =>
    isDarkMode &&
    `
    background-color: #121212;
  `}
`;

const Footer = styled.footer`
  margin-top: auto;
`;

interface AppProps {
  theme: Theme;
  i18n: i18n;
  settings: IPhoneSettings;
}

const App = (props: AppProps) => {
  const isDarkMode = props.theme.palette.mode === 'dark';

  return (
    <SnackbarProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={props.theme}>
          <PhoneSnackbar />
          <Container isDarkMode={isDarkMode}>
            <Header />
            <Switch>
              <Route exact path="/housing">
                  <HouseList isDarkMode={isDarkMode} />
              </Route>
              <Route exact path="/housing/keys">
                  <KeyList isDarkMode={isDarkMode} />
              </Route>
            </Switch>
            <Modal />
            <ModalBackground />
            <Footer>
              <HousingNavBar />
            </Footer>
          </Container>
        </ThemeProvider>
      </StyledEngineProvider>
    </SnackbarProvider>
  );
};

const WithProviders: React.FC<AppProps> = (props) => (
  <NuiProvider>
    <RecoilRoot>
      <App {...props} />
    </RecoilRoot>
  </NuiProvider>
);

export default WithProviders;
