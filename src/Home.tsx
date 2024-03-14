import React, { useState } from 'react';
import Session from './views/Session/Session';
import { BottomNavigation } from 'react-native-paper';
import SessionEditor from './views/SessionEditor/SessionEditor';
import Config from './views/Config/Config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Home = () => {
    const insets = useSafeAreaInsets();
    const [index, setIndex] = useState(0);

    const [routes] = useState([
        { key: 'session', title: 'Session', focusedIcon: 'dice-6' },
        { key: 'editor', title: 'Edit session', focusedIcon: 'pencil' },
        { key: 'config', title: 'Configuration', focusedIcon: 'cog-outline' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        session: Session,
        editor: SessionEditor,
        config: Config,
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            style={{ paddingTop: insets.top }}
        />
    );
};

export default Home;
