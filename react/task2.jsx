import { useState, Fragment } from "react";

function CensoredWord({ word }) {
  const [isCensored, setIsCensored] = useState(true);

  const toggleCensoreship = () => {
    setIsCensored((initialValue) => !initialValue);
  };

  return (
    <span onClick={toggleCensoreship}>
      {isCensored ? word.replace(/\w/g, "*") : word}
    </span>
  );
}

//Checks if word is a bad word (punctuation is taken into account)
function isBadWord(string, badWords) {
  const regex = new RegExp(`\\b(${badWords.join("|")})[.,!?]*\\b`, "gi");
  return regex.test(string);
}

export function CensoredText({ badWords, children }) {
  const elements = children.split(" ").reduce(
    (acc, item, i, arr) => {
      // Case, when bad word is found
      if (isBadWord(item, badWords)) {
        return {
          intermediate: [],
          final: [
            ...acc.final,
            acc.intermediate.join(" ") + " ",
            <Fragment key={`${item}${i}`}>
              <CensoredWord word={item} />{" "}
            </Fragment>,
          ],
        };
      }

      // Case, when we reached the last word
      if (i === arr.length - 1) {
        return {
          intermediate: [...acc.intermediate, item],
          final: [...acc.final, [...acc.intermediate, item].join(" ") + " "],
        };
      }

      //Case, when the word is not a bad word and its not the last word
      return {
        intermediate: [...acc.intermediate, item],
        final: acc.final,
      };
    },
    {
      intermediate: [],
      final: [],
    }
  );
  return <p>{elements.final.map((item) => item)}</p>;
}
