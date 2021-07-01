import React from "react";
import Dapp from "./Dapp";
import { useContract } from "web3-hooks";
import { SmartWordsAddress, SmartWordsAbi } from "./contracts/SmartWords";

export const SmartWordsContext = React.createContext(null);

function App() {
  const smartWords = useContract(SmartWordsAddress, SmartWordsAbi);
  return (
    <SmartWordsContext.Provider value={smartWords}>
      <Dapp />
    </SmartWordsContext.Provider>
  );
}

export default App;
