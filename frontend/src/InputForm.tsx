import React, {useState} from 'react';

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
}

function InputForm() {
    const [todo, setTodo] = useState('')
    return <form onSubmit={handleSubmit}>
        <h1>Add Todo</h1>
        <label>
            Todo: <input type="text" value={todo} onChange={e => setTodo(e.target.value)}/>
        </label>
        <button>Submit</button>
    </form>
}

export default InputForm;
