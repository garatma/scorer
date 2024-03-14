import React, { Dispatch, createContext, useContext, useReducer } from 'react';
import { Player, Session } from '../views/Session/types';
import { intoStorage } from '../utils/storage';
import { randomUUID } from 'expo-crypto';

type SessionAction =
    | {
          type: 'player/add';
      }
    | {
          type: 'player/remove';
          payload: string; // id
      }
    | {
          type: 'player/update';
          payload: {
              key: 'name' | 'score';
              value: string;
              id: string;
          };
      }
    | {
          type: 'title';
          payload: string;
      };

const initialSession = {
    title: '',
    players: [],
};

const titleKey = 'title';
const playersKey = 'players';

// const useSessionContext = () => {
//     useEffect(() => {
//         // on first run: init state with storage
//         fromStorageDo<Player[]>(playersKey, setPlayers);
//         fromStorageDo<string>(titleKey, setTitle);
//     }, []);
// };

const SessionContext = createContext<Session>(initialSession);
const SessionDispatchContext = createContext<Dispatch<SessionAction>>(
    undefined as unknown as Dispatch<SessionAction>,
); // TODO: fix typings

export function useSession() {
    return useContext(SessionContext);
}

export function useSessionDispatch() {
    return useContext(SessionDispatchContext);
}

function sessionReducer(session: Session, action: SessionAction): Session {
    switch (action.type) {
        case 'player/add': {
            const newPlayerList = session.players.slice(0);
            newPlayerList.push({
                id: randomUUID(),
                name: '',
                score: '0',
            });

            intoStorage<Player[]>(playersKey, newPlayerList);
            return { ...session, players: newPlayerList };
        }
        case 'player/update': {
            const index = session.players.findIndex(({ id }) => {
                return id === action.payload.id;
            });

            if (index === -1) return session;

            const newPlayerList = session.players.slice(0);
            newPlayerList[index][action.payload.key] = action.payload.value;

            intoStorage<Player[]>(playersKey, newPlayerList);
            return { ...session, players: newPlayerList };
        }
        case 'player/remove': {
            const index = session.players.findIndex(({ id }) => {
                return id === action.payload;
            });

            if (index === -1) return session;

            const newPlayerList = session.players.slice(0);
            newPlayerList.splice(index, 1);
            intoStorage<Player[]>(playersKey, newPlayerList);
            return { ...session, players: newPlayerList };
        }
        case 'title': {
            intoStorage<string>(titleKey, action.payload);
            return { ...session, title: action.payload };
        }
        default: {
            throw Error('Unknown action: ' + action);
        }
    }
}

type SessionProviderProps = {
    children: React.ReactNode;
};

function SessionProvider({ children }: SessionProviderProps) {
    const [session, dispatch] = useReducer(sessionReducer, initialSession);

    // TODO: initial session from storage

    return (
        <SessionContext.Provider value={session}>
            <SessionDispatchContext.Provider value={dispatch}>
                {children}
            </SessionDispatchContext.Provider>
        </SessionContext.Provider>
    );
}

export default SessionProvider;
export { titleKey, playersKey };