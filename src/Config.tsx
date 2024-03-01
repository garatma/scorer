import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Player as Player } from './types';
import PlayerComponent from './PlayerComponent';
import { randomUUID } from 'expo-crypto';
import { fromStorageDo, intoStorage } from './storage';

const playersKey = 'players';
const titleKey = 'title';

const Config = () => {
    const [title, setTitle] = useState('');
    const [players, setPlayers] = useState<Player[]>([]);

    const onAddUser = () => {
        const newPlayerList = players.slice(0);
        newPlayerList.push({
            id: randomUUID(),
            name: '',
            score: '0',
        });
        setPlayers(newPlayerList);
        intoStorage<Player[]>(playersKey, players);
    };

    const onModifyPlayerName = (player: Player, name: string) => {
        const index = players.findIndex(({ id }) => {
            return id === player.id;
        });

        if (index === -1) return;

        const newPlayerList = players.slice(0);
        newPlayerList[index].name = name;
        setPlayers(newPlayerList);
        intoStorage<Player[]>(playersKey, players);
    };

    const onRemovePlayer = (player: Player) => {
        const index = players.findIndex(({ id }) => {
            return id === player.id;
        });

        if (index === -1) return;

        const newPlayerList = players.slice(0);
        newPlayerList.splice(index, 1);
        setPlayers(newPlayerList);
        intoStorage<Player[]>(playersKey, players);
    };

    const onModifyPlayerScore = (player: Player, score: string) => {
        const index = players.findIndex(({ id }) => {
            return id === player.id;
        });

        if (index === -1) return;

        const newPlayerList = players.slice(0);
        newPlayerList[index].score = score;
        setPlayers(newPlayerList);
        intoStorage<Player[]>(playersKey, players);
    };

    const onChangeTitle = (newTitle: string) => {
        setTitle(newTitle);
        intoStorage<string>(titleKey, newTitle);
    };

    useEffect(() => {
        // on first run: init state with storage
        fromStorageDo<Player[]>(playersKey, setPlayers);
        fromStorageDo<string>(titleKey, setTitle);
    }, []);

    return (
        <View style={styles.view}>
            <TextInput
                placeholder="Session title"
                value={title}
                onChangeText={onChangeTitle}
                autoFocus
            ></TextInput>
            <FlatList
                data={players}
                keyExtractor={(item) => item.id}
                renderItem={({ item: player }) => {
                    return (
                        <PlayerComponent
                            player={player}
                            onChangeScore={(score) => {
                                onModifyPlayerScore(player, score);
                            }}
                            onChangeName={(name) =>
                                onModifyPlayerName(player, name)
                            }
                            onRemove={() => onRemovePlayer(player)}
                        />
                    );
                }}
            ></FlatList>
            <Button icon="plus-circle" onPress={onAddUser}>
                Add user
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {},
});

export default Config;
