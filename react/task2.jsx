function CensoredWord({ word }) {
  const [isCensored, setIsCensored] = useState(true);


  return (
    <span
      onClick={() => {
        setIsCensored((initialValue) => !initialValue);
      }}>
      {isCensored ? word.replace(/./g, "*") : word}
    </span>
  );
}

function CensoredText({ badWords, children }) {
  const elements = children.split(" ").reduce(
    (acc, item, i, arr) => {
      if (badWords.includes(item.toLowerCase())) {
        return {
          intermediate: [],
          final: [
            ...acc.final,
            acc.intermediate.join(" ") + " ",
            <>
              <CensoredWord word={item} />{" "}
            </>,
          ],
        };
      }

      if (i === arr.length - 1) {
        return {
          intermediate: [...acc.intermediate, item],
          final: [...acc.final, [...acc.intermediate, item].join(" ") + " "],
        };
      }
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
