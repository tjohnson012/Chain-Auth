import{ApiPromise,Keyring,WsProvider}from"@polkadot/api"
import{cryptoWaitReady}from"@polkadot/util-crypto"
export async function getKP(p:any){await cryptoWaitReady();const k=await p.request({method:"private_key"});return new Keyring({ss58Format:42,type:"sr25519"}).addFromUri(`0x${k}`)}
export async function getAddr(p:any){return(await getKP(p)).address}
export async function getBal(p:any){const k=await getKP(p);const a=await ApiPromise.create({provider:new WsProvider("wss://westend-rpc.polkadot.io")});return(await a.query.system.account(k.address)).toHuman()}
export async function sendTx(p:any,to:string,amt:number){const k=await getKP(p);const a=await ApiPromise.create({provider:new WsProvider("wss://westend-rpc.polkadot.io")});return await a.tx.balances.transferKeepAlive(to,amt).signAndSend(k)}
