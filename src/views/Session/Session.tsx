import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useSession, useSessionDispatch } from '../../context/SessionContext';
import PlayerComponent from './PlayerComponent';

const Session = () => {
    // TODO: merge into one
    const session = useSession();
    const dispatch = useSessionDispatch();

    return (
        <View style={styles.view}>
            <TextInput
                placeholder="Session title"
                value={session.title}
                editable={false}
            ></TextInput>
            <FlatList
                data={session.players}
                keyExtractor={(item) => item.id}
                renderItem={({ item: player }) => {
                    return (
                        <PlayerComponent
                            player={player}
                            editable={false}
                            onChangeScore={(score) => {
                                dispatch({
                                    type: 'player/update',
                                    payload: {
                                        id: player.id,
                                        key: 'score',
                                        value: score,
                                    },
                                });
                            }}
                            onChangeName={(name) => {
                                dispatch({
                                    type: 'player/update',
                                    payload: {
                                        id: player.id,
                                        key: 'score',
                                        value: name,
                                    },
                                });
                            }}
                        />
                    );
                }}
            ></FlatList>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {},
});

export default Session;
