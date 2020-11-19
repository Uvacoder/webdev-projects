import React, { useState } from "react";
import Article from "./components/Article";
import Feed from "./components/Feed";
import Info from "./components/Info";
import { HorizontalSpacer, VerticalSpacer } from "./components/Spacer";
import StarButton from "./components/StarButton";
import Tabs from "./components/Tabs";
import Trade from "./components/Trade";
import useFetch from "./hooks/useFetch";
import { ArticleResource, InfoResource } from "./resources";

function Overview() {
  const infoResult = useFetch<InfoResource>("http://localhost:3000/info/1");
  const articlesResult = useFetch<ArticleResource[]>(
    "http://localhost:3000/articles"
  );

  return (
    <>
      {infoResult.status === "success" && (
        <>
          <Info
            title={infoResult.value.title}
            resources={infoResult.value.links}
          >
            {infoResult.value.content}
          </Info>
          <VerticalSpacer size={24} />
        </>
      )}
      <Trade title="Trade" />
      <VerticalSpacer size={24} />
      <Feed title="Top Stories">
        {articlesResult.status === "success" &&
          articlesResult.value.map((article) => (
            <Article
              key={article.id}
              title={article.title}
              author={article.author}
              formattedDate={article.formattedDate}
              summary={article.summary}
              url={article.url}
              image={article.image}
            />
          ))}
      </Feed>
    </>
  );
}

export default function App() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <main className="content">
      <div className="row">
        <h1>Bitcoin</h1>
        <HorizontalSpacer />
        <StarButton />
      </div>
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
