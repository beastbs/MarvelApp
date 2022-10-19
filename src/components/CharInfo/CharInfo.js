import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Skeleton from "../Skeleton/Skeleton";

import "./CharInfo.scss";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);

  const { loading, error, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [props.charId]);

  const updateChar = () => {
    const { charId } = props;
    if (!charId) {
      return;
    }
    clearError();
    getCharacter(charId).then(onCharLoaded);
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const skeleton = char || loading || error ? null : <Skeleton />;

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <View char={char} /> : null;

  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;
  let objectFit = { objectFit: "cover" };
  const notAvalibleImg =
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
  if (thumbnail === notAvalibleImg) {
    objectFit = { objectFit: "fill" };
  }

  return (
    <>
      <div className="char__basics">
        <img style={objectFit} src={thumbnail} alt={name} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a
              href={homepage}
              className="button button__main"
              target={"_blank"}
            >
              <div className="inner">homepage</div>
            </a>
            <a
              href={wiki}
              className="button button__secondary"
              target={"_blank"}
            >
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">
        {description || "Description for this character in not avalible."}
      </div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length === 0
          ? "There is no comics with this character"
          : comics.map((item, i) => {
              // eslint-disable-next-line
              if (i >= 10) return;
              return (
                <li key={i} className="char__comics-item">
                  {item.name}
                </li>
              );
            })}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
};

export default CharInfo;
