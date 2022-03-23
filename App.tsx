import React from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {Home} from './src/modules/Home';
import {QueryClient, QueryClientProvider} from 'react-query';

const App = () => {
  const queryClient = new QueryClient();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const labelStyle = {
    color: isDarkMode ? '#fff' : '#000',
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView>
        <Home backgroundStyle={backgroundStyle} labelStyle={labelStyle} />
      </SafeAreaView>
    </QueryClientProvider>
  );
};

export default App;
