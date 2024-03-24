"use client";

import React, { useState } from "react";

function Word(props) {
  const [expand, setExpand] = useState(false);

  function handleClick() {
    setExpand((expand) => !expand);
  }

  return (
    <>
      <p
        style={{ cursor: "pointer" }}
        onClick={handleClick}
        className="text-3xl"
      >
        {props.data.word}
      </p>
      {expand ? section(props.data) : null}
    </>
  );
}

function section(data) {
  const columns = data.sections?.length;

  return (
    <div className="grid grid-flow-col auto-cols-fr">
      {data.sections
        ? data.sections.map((word, key) => {
            return (
              <div key={key}>
                <p className="text-lg">{word.word}</p>
                {word.sections?.length > 0 ? section(word) : null}
              </div>
            );
          })
        : null}
    </div>
  );
}

export default Word;
