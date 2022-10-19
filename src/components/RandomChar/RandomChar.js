import { useState, useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";

import mjolnir from "../../assets/img/mjolnir.png";
import "./RandomChar.scss";

const RandomChar = () => {
  const [char, setChar] = useState(null);
  const { loading, error, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateChar();
    const timerId = setInterval(updateChar, 60000);

    return function () {
      clearInterval(timerId);
    };
  }, []);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = () => {
    clearError();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    getCharacter(id).then(onCharLoaded);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <View char={char} /> : null;

  return (
    <div className="randomchar">
      {errorMessage}
      {spinner}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button className="button button__main">
          <div onClick={updateChar} className="inner">
            try it
          </div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const View = ({ char }) => {
  const { thumbnail, name, homepage, wiki, description } = char;
  let objectFitStyle = { objectFit: "cover" };

  if (
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    objectFitStyle = { objectFit: "fill" };
  }

  const descriptionUnavalible =
    "Description for this character is not avalible.";
  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        style={objectFitStyle}
        alt="Random character"
        className="randomchar__img"
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">
          {description.length > 150
            ? description.slice(0, 150) + "..."
            : description || descriptionUnavalible}
        </p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main" target={"_blank"}>
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary" target={"_blank"}>
            <div className="inner">wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
