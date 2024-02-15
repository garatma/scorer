import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Player } from './types';
import { TextInput } from 'react-native-paper';

type Props = {
    player: Player;
    onChangeScore: (score: string) => void;
    onChangeName: (name: string) => void;
    onRemove: () => void;
};

const PlayerComponent = ({
    player,
    onChangeScore,
    onChangeName,
    onRemove,
}: Props) => {
    const onChangeScoreText = (score: string) => {
        const sanitizedScore =
            score.at(-1) === '.' ? score.substring(0, score.length - 1) : score;

        onChangeScore(sanitizedScore);
    };

    const onChangeScoreByButton = (delta: number) => {
        const score =
            player.score === ''
                ? 0 + delta
                : Number.parseInt(player.score) + delta;

        onChangeScore(score.toString());
    };

    return (
        <View style={styles.view}>
            <TextInput
                style={styles.text}
                placeholder="New player"
                value={player.name}
                onChangeText={onChangeName}
                autoFocus
            />
            <TextInput
                keyboardType="numeric"
                value={player.score}
                onChangeText={onChangeScoreText}
            />
            <Button icon="minus" onPress={() => onChangeScoreByButton(-1)}>
                {' '}
            </Button>
            <Button icon="plus" onPress={() => onChangeScoreByButton(+1)}>
                {' '}
            </Button>
            <Button icon="delete" onPress={onRemove}>
                {' '}
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        minWidth: 120,
    },
});

export default PlayerComponent;
