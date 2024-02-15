import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Player } from './types';
import { TextInput, Text } from 'react-native-paper';

type Props = {
    player: Player;
    onIncrease: () => void;
    onDecrease: () => void;
    onChangeName: (name: string) => void;
    onRemove: () => void;
};

const PlayerComponent = ({
    player,
    onIncrease,
    onDecrease,
    onChangeName,
    onRemove,
}: Props) => {
    return (
        <View style={styles.view}>
            <TextInput
                label="Name"
                value={player.name}
                onChangeText={onChangeName}
            />
            <Text>{player.score}</Text>
            <Button icon="plus" onPress={onIncrease}>
                {' '}
            </Button>
            <Button icon="minus" onPress={onDecrease}>
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
});

export default PlayerComponent;
