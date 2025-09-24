import { useState, useRef } from "react";
import { Task } from "./Task";

export function Column(props: { title: string, items: string[], setter: (items: string[]) => void }) {
    const [content, setContent] = useState("");
    const [hovered, setHovered] = useState(false);
    const highlightedColumn = useRef<string | null>(null); // Ref to track highlighted column

    function mouseEnter(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        setHovered(true);
        highlightedColumn.current = props.title; // Set the highlighted column
        const element = event.currentTarget; 
        element.style.border = "2px solid blue";
    }

    function mouseLeave(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        setHovered(false);
        highlightedColumn.current = null; // Clear the highlighted column
        const element = event.currentTarget; 
        element.style.border = "2px solid #ccc";
    }

    return <div className="column" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
        <h2>{props.title}</h2>
        <input type="text" name="content" onChange={(event)=>{setContent(event.target.value)}} value={content}/>
        <button onClick={()=>{
            props.setter([...props.items, content]);
            setContent("");
            }}>Add</button>
        
            {props.items.map((item, index) => 
                <Task 
                    key={index} 
                    index={index} 
                    content={item} 
                    setter={props.setter} 
                    items={props.items} 
                    highlightedColumn={highlightedColumn} // Pass the ref to Task
                />
            )}
        
    </div>
}