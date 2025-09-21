import { useState } from "react";
import { Task } from "./Task";

export function Column(props: { title: string, items: string[], setter: (items: string[]) => void }) {
    let [content, setContent] = useState("");

    return <div className="column">
        <h2>{props.title}</h2>
        <input type="text" name="content" onChange={(event)=>{setContent(event.target.value)}} value={content}/>
        <button onClick={()=>{
            props.setter([...props.items, content]);
            setContent("");
            }}>Add</button>
        
            {props.items.map((item, index) => <Task key={index} index={index} content={item} setter={props.setter}/>)}
        
    </div>
}