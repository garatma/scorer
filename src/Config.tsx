import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Player as Player } from './types';
import PlayerComponent from './PlayerComponent';
import { randomUUID } from 'expo-crypto';

const Config = () => {
    const [players, setPlayers] = useState<Player[]>([]);

    const onAddUser = () => {
        const newPlayerList = players.slice(0);
        newPlayerList.push({
            id: randomUUID(),
            // id: new Date().toISOString(),
            name: '',
            score: 0,
        });
        setPlayers(newPlayerList);
    };

    const onModifyPlayerName = (player: Player, name: string) => {
        const index = players.findIndex(({ id }) => {
            return id === player.id;
        });

        if (index === -1) return;

        const newPlayerList = players.slice(0);
        newPlayerList[index].name = name;
        setPlayers(newPlayerList);
    };

    const onRemovePlayer = (player: Player) => {
        const index = players.findIndex(({ id }) => {
            return id === player.id;
        });

        if (index === -1) return;

        const newPlayerList = players.slice(0);
        newPlayerList.splice(index, 1);
        setPlayers(newPlayerList);
    };

    const onModifyPlayerScore = (player: Player, delta: number) => {
        const index = players.findIndex(({ id }) => {
            return id === player.id;
        });

        if (index === -1) return;

        const newPlayerList = players.slice(0);
        newPlayerList[index].score += delta;
        setPlayers(newPlayerList);
    };

    return (
        <View style={styles.view}>
            <FlatList
                data={players}
                keyExtractor={(item) => item.id}
                renderItem={({ item: player }) => {
                    return (
                        <PlayerComponent
                            player={player}
                            onIncrease={() => onModifyPlayerScore(player, +1)}
                            onDecrease={() => onModifyPlayerScore(player, -1)}
                            onChangeName={(name) =>
                                onModifyPlayerName(player, name)
                            }
                            onRemove={() => onRemovePlayer(player)}
                        />
                    );
                }}
            ></FlatList>
            <Button icon="plus" onPress={onAddUser}>
                Add user
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {},
});

export default Config;
