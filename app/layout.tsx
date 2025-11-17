import'./globals.css'
import{Web3AuthProvider}from'@/lib/web3auth'
export const metadata={title:'ChainAuth'}
export default function RootLayout({children}:any){return<html><body><Web3AuthProvider>{children}</Web3AuthProvider></body></html>}
