import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useSession, useSessionDispatch } from '../../context/SessionContext';
import PlayerComponent from '../Session/PlayerComponent';

const SessionEditor = () => {
    const session = useSession();
    const dispatch = useSessionDispatch();

    return (
        <View style={styles.view}>
            <TextInput
                placeholder="Session title"
                value={session.title}
                onChangeText={(title) =>
                    dispatch({ type: 'title', payload: title })
                }
            ></TextInput>
            <FlatList
                data={session.players}
                keyExtractor={(item) => item.id}
                renderItem={({ item: player }) => {
                    return (
                        <PlayerComponent
                            player={player}
                            editable
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
                                        key: 'name',
                                        value: name,
                                    },
                                });
                            }}
                            onRemove={() =>
                                dispatch({
                                    type: 'player/remove',
                                    payload: player.id,
                                })
                            }
                        />
                    );
                }}
            ></FlatList>
            <Button
                icon="plus-circle"
                onPress={() => dispatch({ type: 'player/add' })}
            >
                Add player
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {},
});

export default SessionEditor;
