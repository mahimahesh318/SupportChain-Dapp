import abi from "./assets/contract/chai.json"
import { useState, useEffect } from "react";
import { BrowserProvider, Contract } from "ethers";
import Buy from "./components/Buy";
import Memos from "./components/Memos";
// import chai from "./chai.png";
import "./App.css";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x92E574EDb67b4aECA11635B5734c5997B8a50aa9";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new BrowserProvider(ethereum);
          const signer = await provider.getSigner();
          const contract = new Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);
  // console.log(state);
  return (
    <div className="app-bg">
      <header className="app-header">
        <h1 className="app-title">SupportChain</h1>
        <p className="app-subtitle">A Decentralized Creator Tipping Platform</p>
        <div className="account-info">
          <small>Connected Account: <span className="account-address">{account}</span></small>
        </div>
      </header>
      <main className="app-main">
        <Buy state={state} />
        <Memos state={state} />
      </main>
    </div>
  );
}

export default App;