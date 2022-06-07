import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
const { business, entertainment, general, health, science, sports, technology } = require('../api/news_api');

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0)
    let { category } = props;

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const FetchNewsLocal = async () => {
        props.setProgress(10);
        setLoading(true);
        props.setProgress(30);
        props.setProgress(70);

        if (category === "general") {
            setArticles(general.articles.slice(0, page * 6));
            setTotalResults(general.articles.length);
        }
        else if (category === "business") {
            setArticles(business.articles.slice(0, page * 6));
            setTotalResults(business.articles.length);
        }
        else if (category === "entertainment") {
            setArticles(entertainment.articles.slice(0, page * 6));
            setTotalResults(entertainment.articles.length);
        }
        else if (category === "health") {
            setArticles(health.articles.slice(0, page * 6));
            setTotalResults(health.articles.length);
        }
        else if (category === "science") {
            setArticles(science.articles.slice(0, page * 6));
            setTotalResults(science.articles.length);
        }
        else if (category === "sports") {
            setArticles(sports.articles.slice(0, page * 6));
            setTotalResults(sports.articles.length);
        }
        else if (category === "technology") {
            setArticles(technology.articles.slice(0, page * 6));
            setTotalResults(technology.articles.length);
        }
        setLoading(false);
        props.setProgress(100);
    }

    const fetchMoreNews = async () => {
        if (category === "general") {
            setArticles(articles.concat((general.articles).slice(6 * page, 6 * (page + 1))));
        }
        else if (category === "business") {
            setArticles(articles.concat((business.articles).slice(6 * page, 6 * (page + 1))));
        }
        else if (category === "entertainment") {
            setArticles(articles.concat((entertainment.articles).slice(6 * page, 6 * (page + 1))));
        }
        else if (category === "health") {
            setArticles(articles.concat((health.articles).slice(6 * page, 6 * (page + 1))));
        }
        else if (category === "science") {
            setArticles(articles.concat((science.articles).slice(6 * page, 6 * (page + 1))));
        }
        else if (category === "sports") {
            setArticles(articles.concat((sports.articles).slice(6 * page, 6 * (page + 1))));
        }
        else if (category === "technology") {
            setArticles(articles.concat((technology.articles).slice(6 * page, 6 * (page + 1))));
        }
        setPage(page + 1);
    }
    useEffect(() => {
        document.title = `${capitalizeFirstLetter(category)}-News`;
        FetchNewsLocal();
        // eslint-disable-next-line 
    }, [])

    return (
        <>
            <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>NewsApi - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreNews}
                hasMore={articles.length !== totalResults}
            ></InfiniteScroll>
            <div className="container">
                <div className="row">
                    {articles.map((element, index) => {
                        return <div className="col-md-4" key={index}>
                            <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

export default News
