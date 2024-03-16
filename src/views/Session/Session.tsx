import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { TextInput } from 'react-native-paper';
import PlayerComponent from '../../components/PlayerComponent';
import { useSession, useSessionDispatch } from '../../contexts/SessionContext';
import { Player } from './types';

const Session = () => {
    const session = useSession();
    const dispatch = useSessionDispatch();
    const [showAnimation, setShowAnimation] = useState(false);

    const onChangeScore = (player: Player) => {
        return (score: string) => {
            if (Number(score) === 5) {
                // TODO: can this throw an exception?
                setShowAnimation(true);
            }

            dispatch({
                type: 'player/update',
                payload: {
                    id: player.id,
                    key: 'score',
                    value: score,
                },
            });
        };
    };

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
                    return getPlayer(player, onChangeScore(player));
                }}
            ></FlatList>
            {showAnimation && (
                <ConfettiCannon
                    count={100}
                    origin={{ x: -10, y: -10 }}
                    fadeOut
                    // explosionSpeed={1000}
                    // fallSpeed={5000}
                    onAnimationEnd={() => setShowAnimation(false)}
                ></ConfettiCannon>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    view: { flex: 1 },
});

const getPlayer = (player: Player, onChangeScore: (score: string) => void) => {
    return (
        <PlayerComponent
            player={player}
            editable={false}
            onChangeScore={onChangeScore}
        />
    );
};

export default Session;
