import React, { useRef, useState } from "react";

const Nav = ({ onSmash }) => {
  const [data, setData] = useState(Array.from(Array(10).keys()));

  const parentRef = useRef(null);
  function getAllSiblings(element, parent) {
    const btns = parent.children;
    for (let el of btns) {
      el.classList.remove("btn-active");
    }
  }

  return (
    <nav ref={parentRef}>
      {data.length > 0 &&
        data.map((cat) => (
          <button
            key={cat}
            onClick={(e) => {
              getAllSiblings(e.target, parentRef.current);

              if (Number(e.target.innerText) === cat + 1) {
                e.target.classList.add("btn-active");
              }

              onSmash(cat);
            }}
          >
            {cat + 1}
          </button>
        ))}
    </nav>
  );
};

export default Nav;
