import React from "react";

export function Task(props: {
  index: number;
  content: string;
  setter: (items: string[]) => void;
  items: string[];
  highlightedColumn: React.RefObject<string | null>; 
  uni: (item: string, to: string) => void;
}) {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [style, setStyle] = React.useState<React.CSSProperties>({});
  const draggingRef = React.useRef(false);

  function deleteTask(id: number) {
    props.setter(props.items.filter((_, index) => index !== id));
  }

  function mouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const element = event.currentTarget;
    draggingRef.current = true;

    setStyle({
      opacity: 0.5,
      position: "fixed", // Changed from "absolute" to "fixed"
      zIndex: 1000,
      pointerEvents: "none", 
      left: event.pageX - element.offsetWidth / 2,
      top: event.pageY - element.offsetHeight / 2,
      userSelect: "none",
    });

    function onMouseMove(e: MouseEvent) {
      if (!draggingRef.current) return;
      setPosition({ x: e.pageX, y: e.pageY });
      setStyle((prev) => ({
        ...prev,
        left: e.pageX - element.offsetWidth / 2,
        top: e.pageY - element.offsetHeight / 2,
      }));
    }

    function onMouseUp() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);

      const targetColumn = props.highlightedColumn.current;
      // console.log("drop to:", targetColumn);

      draggingRef.current = false;
      setStyle((prev) => ({
        ...prev,
        opacity: 1,
        position: "static",
        zIndex: "auto",
        pointerEvents: "auto",
        left: undefined,
        top: undefined,
      }));

      if (targetColumn) {
        props.setter(props.items.filter((_, idx) => idx !== props.index));
        props.uni(props.content, targetColumn);
      }
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp, { once: true });
  }

  return (
    <div
      onMouseDown={mouseDown}
      className="task"
      style={{
        ...style,
        left: position.x,
        top: position.y,
        userSelect: "none",
      }}
    >
      {props.content}
      <br />
      <button
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          deleteTask(props.index);
        }}
      >
        Delete
      </button>
    </div>
  );
}
