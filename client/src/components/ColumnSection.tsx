import { useRef, useState } from "react";
import { Column } from "./Column";

export function ColumnSection() {
  let [toDo, setToDo] = useState<string[]>(["Task 1", "Task 2", "Task 3"]);
  let [inProcess, setInProcess] = useState<string[]>(["Task 4", "Task 5"]);
  let [inReview, setInReview] = useState<string[]>(["Task 6"]);
  let [done, setDone] = useState<string[]>(["Task 7", "Task 8"]);

  const hoverRef = useRef<string | null>(null);

  function universalSetter(item: string, to: string) {
    switch (to) {
      case "To Do":
        setToDo((prev) => [...prev, item]);
        break;
      case "In Process":
        setInProcess((prev) => [...prev, item]);
        break;
      case "In Review":
        setInReview((prev) => [...prev, item]);
        break;
      case "Done":
        setDone((prev) => [...prev, item]);
        break;
      default:
        console.error("Unknown column: " + to);
    }
  }

  return (
    <div className="column-section">
      <Column title="To Do" items={toDo} setter={setToDo} uni={universalSetter} hoverRef={hoverRef} />
      <Column title="In Process" items={inProcess} setter={setInProcess} uni={universalSetter} hoverRef={hoverRef} />
      <Column title="In Review" items={inReview} setter={setInReview} uni={universalSetter} hoverRef={hoverRef} />
      <Column title="Done" items={done} setter={setDone} uni={universalSetter} hoverRef={hoverRef} />
    </div>
  );
}
