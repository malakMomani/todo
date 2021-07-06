import React,{useState} from 'react';

export const SettingsContext = React.createContext();

// make it a function component
function SettingsProvider({children}) {

    const [hideCompletedItems  , setHideCompletedItems] = useState(true);
    const [sortTasks, setSortTask] = useState('difficulty');

    const state = {
        hideCompletedItems,
        sortTasks,
        setHideCompletedItems,
        setSortTask
    }

    return (
        <SettingsContext.Provider value={state}>
            {children}
        </SettingsContext.Provider>
    )
}

export default SettingsProvider;