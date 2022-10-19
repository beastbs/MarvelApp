import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";

import "./ComicsList.scss";

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [comicsEnded, setComicsEnded] = useState(false);

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const { loading, error, getAllComics } = useMarvelService();

  const onRequest = (offset, init) => {
    init ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllComics(offset).then((response) => onComicsListLoaded(response));
  };

  const onComicsListLoaded = (newComicsList) => {
    let ended = false;

    if (newComicsList.length < 8) {
      ended = true;
    }
    setComicsList([...comicsList, ...newComicsList]);
    setNewItemLoading(false);
    setOffset(offset + 8);
    setComicsEnded(ended);
  };

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      return (
        <li className="comics__item" key={i}>
          <Link to={`/comics/${item.id}`}>
            <img
              src={item.thumbnail}
              alt={item.title}
              className="comics__item-img"
            />
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">{item.price}</div>
          </Link>
        </li>
      );
    });
    return <ul className="comics__grid">{items}</ul>;
  }

  const items = renderItems(comicsList);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;

  return (
    <div className="comics">
      <div className="comics__list">
        {errorMessage}
        {spinner}
        {items}
        <button
          className="button button__main button__long"
          onClick={() => onRequest(offset)}
          disabled={newItemLoading}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    </div>
  );
};

export default ComicsList;
