import React from "react";

export function Task(props: { 
    index: number, 
    content: string, 
    setter: (items: string[]) => void, 
    items: string[], 
    highlightedColumn: React.RefObject<string | null> // Accept the highlighted column ref
}) {
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [style, setStyle] = React.useState<React.CSSProperties>({});

    function deleteTask(id: number) {
        props.setter(props.items.filter((item, index) => index !== id));
    }

    function mouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const element = event.currentTarget; 
        setStyle({
            opacity: 0.5,
            position: "absolute",
            zIndex: 1000,
        });

        function onMouseMove(event: MouseEvent) {
            setPosition({ x: event.pageX, y: event.pageY });
            setStyle((prevStyle) => ({
                ...prevStyle,
                left: event.pageX - element.offsetWidth / 2,
                top: event.pageY - element.offsetHeight / 2,
            }));
        }

        function onMouseUp() {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
            setStyle((prevStyle) => ({
                ...prevStyle,
                opacity: 1,
                position: "static",
                zIndex: "auto",
            }));
        }

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp, { once: true });
    }

    function handleMouseUp() {
        if (props.highlightedColumn.current) {
            console.log(`Task dropped on column: ${props.highlightedColumn.current}`);
            // Add logic here to move the task to the highlighted column
        }
    }

    return (
        <div 
            onMouseDown={mouseDown} 
            className="task" 
            style={{ ...style, left: position.x, top: position.y, userSelect: "none" }}
            onMouseUp={handleMouseUp} // Handle mouse up event
        >
            {props.content}
            <br />
            <button 
                onMouseDown={(event) => event.stopPropagation()} 
                onClick={() => deleteTask(props.index)}
            >
                Delete
            </button>
        </div>
    );
}