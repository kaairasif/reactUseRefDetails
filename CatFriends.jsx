import { useRef } from "react";
import Nav from "./Nav";

export default function CatFriends() {
  const itemsRef = useRef(null); // only for storage

  function scrollToId(itemId) {
    const map = getMap();
    const node = map.get(itemId);

    node.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });

    for (let [key, value] of map) {
      value.classList.remove("active");
      if (key == itemId) {
        value.classList.add("active");
      }
    }
  }

  function getMap() {
    if (!itemsRef.current) {
      // Initialize the Map on first usage.
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  return (
    <>
      <Nav onSmash={scrollToId} />
      <div>
        <ul className="slider">
          {catList.map((cat) => (
            <li
              key={cat.id}
              onClick={() => scrollToId(cat.id)}
              ref={(node) => {
                const map = getMap();

                if (node) {
                  console.log("Creating..");
                  map.set(cat.id, node);
                } else {
                  console.log("Deleting..");
                  map.delete(cat.id);
                }
              }}
            >
              <img src={cat.imageUrl} alt={"Cat #" + cat.id} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const catList = [];
for (let i = 0; i < 10; i++) {
  catList.push({
    id: i,
    imageUrl: "https://placekitten.com/250/200?image=" + i,
  });
}
