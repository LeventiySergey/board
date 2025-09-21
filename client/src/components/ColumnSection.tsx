import { useState } from "react";
import { Column } from "./Column";

export function ColumnSection() {
    let [toDo, setToDo] = useState<string[]>(["Task 1", "Task 2", "Task 3"]);
    let [inProcess, setInProcess] = useState<string[]>(["Task 4", "Task 5"]);
    let [inReview, setInReview] = useState<string[]>(["Task 6"]);
    let [done, setDone] = useState<string[]>(["Task 7", "Task 8"]);
    


    return <div className="column-section">
        <Column title="To Do" items={toDo} setter={setToDo}></Column>
        <Column title="In Process" items={inProcess} setter={setInProcess}></Column>
        <Column title="In Review" items={inReview} setter={setInReview}></Column>
        <Column title="Done" items={done} setter={setDone}></Column>
    </div>
}