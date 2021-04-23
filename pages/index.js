import Head from 'next/head';

import Sidebar from "../components/Sidebars";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Chat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <h1></h1>
    <Sidebar />
      
    </div>
  )
}
