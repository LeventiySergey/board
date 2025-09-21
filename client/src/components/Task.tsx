export function Task(props: { index: number, content: string, setter: (items: string[]) => void  }) {
    function deleteTask(id: number) {
        
    }

    return <div className="task">
        {props.content}
        <br />
        <button>Delete</button>
    </div>
}