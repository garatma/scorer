import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Player as Player } from './types';
import PlayerComponent from './PlayerComponent';
import { randomUUID } from 'expo-crypto';
import { getData, storeData } from './storage';

const playersKey = 'players';

const Config = () => {
    const [players, setPlayers] = useState<Player[]>([]);

    const onAddUser = () => {
        const newPlayerList = players.slice(0);
        newPlayerList.push({
            id: randomUUID(),
            name: '',
            score: '0',
        });
        setPlayers(newPlayerList);
        storeData<Player[]>(playersKey, newPlayerList);
    };

    const onModifyPlayerName = (player: Player, name: string) => {
        const index = players.findIndex(({ id }) => {
            return id === player.id;
        });

        if (index === -1) return;

        const newPlayerList = players.slice(0);
        newPlayerList[index].name = name;
        setPlayers(newPlayerList);
        storeData<Player[]>(playersKey, newPlayerList);
    };

    const onRemovePlayer = (player: Player) => {
        const index = players.findIndex(({ id }) => {
            return id === player.id;
        });

        if (index === -1) return;

        const newPlayerList = players.slice(0);
        newPlayerList.splice(index, 1);
        setPlayers(newPlayerList);
        storeData<Player[]>(playersKey, newPlayerList);
    };

    const onModifyPlayerScore = (player: Player, score: string) => {
        const index = players.findIndex(({ id }) => {
            return id === player.id;
        });

        if (index === -1) return;

        const newPlayerList = players.slice(0);
        newPlayerList[index].score = score;
        setPlayers(newPlayerList);
        storeData<Player[]>(playersKey, newPlayerList);
    };

    useEffect(() => {
        const fetchStoragePlayers = async () => {
            const storagePlayers = await getData<Player[]>(playersKey);
            console.log(storagePlayers);
            if (storagePlayers !== undefined) setPlayers(storagePlayers);
        };

        fetchStoragePlayers();
    }, []);

    return (
        <View style={styles.view}>
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
