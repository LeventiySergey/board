export function Task(props: { index: number, content: string, items: string[], setter: (items: string[]) => void  }) {
    function deleteTask(id: number) {
        props.setter(props.items.filter((item, index) => index !== id));
    }

    return <div className="task">
        {props.content}
        <br />
        <button onClick={()=>deleteTask(props.index)}>Delete</button>
    </div>
}