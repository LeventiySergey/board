import { useState } from "react";
import { Task } from "./Task";

export function Column(props: {
  title: string;
  items: string[];
  setter: (items: string[]) => void;
  uni: (item: string, to: string) => void;
  hoverRef: React.RefObject<string | null>; 
}) {
  const [content, setContent] = useState("");
  
  function mouseEnter(e: React.MouseEvent<HTMLDivElement>) {
    props.hoverRef.current = props.title;
    e.currentTarget.style.border = "2px solid blue";
    // console.log("enter", props.title);
  }

  function mouseLeave(e: React.MouseEvent<HTMLDivElement>) {
    if (props.hoverRef.current === props.title) {
      props.hoverRef.current = null;
    }
    e.currentTarget.style.border = "2px solid #ccc";
    // console.log("leave", props.title);
  }

  return (
    <div className="column" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      <h2>{props.title}</h2>
      <input
        type="text"
        name="content"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      <button
        onClick={() => {
          const v = content.trim();
          if (!v) return;
          props.setter([...props.items, v]);
          setContent("");
        }}
      >
        Add
      </button>

      {props.items.map((item, index) => (
        <Task
          key={`${item}-${index}`}
          index={index}
          content={item}
          setter={props.setter}
          items={props.items}
          highlightedColumn={props.hoverRef} 
          uni={props.uni}
        />
      ))}
    </div>
  );
}
