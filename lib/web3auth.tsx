'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { Web3Auth } from '@web3auth/modal'
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from '@web3auth/base'

const Context = createContext<any>(null)
export const useWeb3Auth = () => useContext(Context)

export function Web3AuthProvider({ children }: any) {
  const [web3auth, setWeb3auth] = useState<any>(null)
  const [provider, setProvider] = useState<any>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [userInfo, setUserInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      try {
        const auth = new Web3Auth({
          clientId: "BHgArYmWwSeq21czpcarYh0EVq2WWOzflX-NTK-tY1-1pauPzHKRRLgpABkmYiIV_og9jAvoIxQ8L3Smrwe04Lw",
          web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.OTHER,
            chainId: 'polkadot',
            rpcTarget: 'wss://westend-rpc.polkadot.io',
          },
        })
        await auth.init()
        setWeb3auth(auth)
        if (auth.connected) {
          setProvider(auth.provider)
          setIsConnected(true)
          const user = await auth.getUserInfo()
          setUserInfo(user)
        }
      } catch (e) {
        console.error('Init error:', e)
      }
      setLoading(false)
    }
    init()
  }, [])

  const connect = async () => {
    if (!web3auth) return
    try {
      const p = await web3auth.connect()
      setProvider(p)
      setIsConnected(true)
      const user = await web3auth.getUserInfo()
      setUserInfo(user)
    } catch (e) {
      console.error('Connect error:', e)
    }
  }

  const disconnect = async () => {
    if (!web3auth) return
    await web3auth.logout()
    setProvider(null)
    setIsConnected(false)
    setUserInfo(null)
  }

  return <Context.Provider value={{ provider, isConnected, userInfo, connect, disconnect, loading }}>{children}</Context.Provider>
}
