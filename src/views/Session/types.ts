type Player = {
    id: string;
    name: string;
    score: string;
};

type Session = {
    title: string;
    players: Player[];
};

export { Player, Session };
