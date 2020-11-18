import React, { useState } from "react";
import Article from "./components/Article";
import Feed from "./components/Feed";
import Info from "./components/Info";
import { VerticalSpacer } from "./components/Spacer";
import Tabs from "./components/Tabs";

function Overview() {
  return (
    <>
      <Info
        title="About Bitcoin"
        resources={[
          { url: "/", title: "Official website" },
          { url: "/", title: "Whitepaper" },
        ]}
      >
        The world’s first cryptocurrency, Bitcoin is stored and exchanged
        securely on the internet through a digital ledger known as a blockchain.
        Bitcoins are divisible into smaller units known as satoshis — each
        satoshi is worth 0.00000001 bitcoin.
      </Info>
      <VerticalSpacer size={24} />
      <Feed title="Top Stories">
        <Article
          title="Novogratz Says Bitcoin is Digital Gold, Not a Currency for Now"
          author="Bloomberg"
          formattedDate="Oct 24"
          summary="Billionaire investor Mike Novogratz is doubling down on a call Bitcoin serves as digital gold."
          url="/"
        />
        <Article
          title="Novogratz Says Bitcoin is Digital Gold, Not a Currency for Now"
          author="Bloomberg"
          formattedDate="Oct 24"
          summary="Billionaire investor Mike Novogratz is doubling down on a call Bitcoin serves as digital gold."
          url="/"
        />
      </Feed>
    </>
  );
}

export default function App() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <main className="content">
      <h1>Bitcoin</h1>
      <VerticalSpacer size={24} />
      <Tabs
        id="category-tabs"
        accessibleLabel="Categories"
        selectedIndex={selectedTabIndex}
        onChangeSelectedIndex={setSelectedTabIndex}
        tabs={[
          { title: "Overview", content: <Overview /> },
          { title: "Wallet", content: "Wallet tab" },
          { title: "Vault", content: "Vault tab" },
        ]}
      />
      <VerticalSpacer size={24} />
    </main>
  );
}
