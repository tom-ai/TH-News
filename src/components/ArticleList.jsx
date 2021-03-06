import { ArticleCard } from "./ArticleCard";
import Sort from "./Sort";
import * as api from "../utils/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import ErrorComponent from "./ErrorComponent";

function ArticleList({ topics }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { topic_id: topicSlug } = useParams();
  const [currentTopic, setCurrentTopic] = useState();

  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    api
      .getArticles(topicSlug)
      .then((articles) => {
        setArticles(articles);
        setCurrentTopic(topicSlug);
        setIsLoading(false);
      })
      .catch(({ response }) => {
        setError(response.status);
        setIsLoading(false);
      });
  }, [topicSlug]);

  if (isLoading) return <Loading />;
  if (error) return <ErrorComponent status={error} />;
  return (
    <div className="pa3">
      <div className=" flex items-center justify-between ">
        <h2 className="f1-l f2 bold ttu o-50">
          {topicSlug ? topicSlug : "All"}
        </h2>
        <Sort currentTopic={currentTopic} setArticles={setArticles} />
      </div>
      <ul className="list pl0">
        {articles.map((article) => {
          return (
            <ArticleCard
              key={article.article_id}
              article_id={article.article_id}
              title={article.title}
              author={article.author}
              topic={article.topic}
              body={article.body}
              comment_count={article.comment_count}
              votes={article.votes}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ArticleList;
