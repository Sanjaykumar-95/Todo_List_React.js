import React, { useState } from 'react';

function Todo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tasks, setTasks] = useState([]);
    const [status, setStatus] = useState("Pending");
    const [editTaskId, setEditTaskId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleAddTask = (event) => {
        event.preventDefault();
        if (title.trim()) {
            if (editTaskId !== null) {
                const updatedTasks = tasks.map(task => task.id === editTaskId ?
                    {
                        ...task,
                        title: title,
                        description: description,
                        updateDate: new Date().toLocaleString(),
                    }
                    : task
                );
                setTasks(updatedTasks);
                setEditTaskId(null);
            } 
            else {
                const newTask = {
                    id: tasks.length + 1,
                    title: title,
                    description: description,
                    startDate: new Date().toLocaleString(),
                    updateDate: new Date().toLocaleString(),
                    showDescription: false,
                    status: status
                };
                setTasks([...tasks, newTask]);
            }
            setTitle("");
            setDescription("");
        }
    };

    const handleEditTask = (task) => {
        setTitle(task.title);
        setDescription(task.description);
        setEditTaskId(task.id);
    };

    const toggleDescription = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, showDescription: !task.showDescription } : task
        ));
    };

    const handleStatusChange = (taskId, newStatus) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, status: newStatus } : task
        ));
    };

    const getStatusStyles = (status) => {
        return {
            color: 'white',
            backgroundColor: status === 'Pending' ? 'red' : 'green'
        };
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='container'>
            <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>Todo List</h1>

            {/* form */}
            <form className='form-control' onSubmit={handleAddTask}>

                {/* Input task Title */}
                <div className='form-group'>
                    <label className='enter_task'>Task Title</label>
                    <textarea
                        type='text'
                        placeholder='Enter your Task Title...'
                        className='form-control'
                        style={{ marginTop: '10px' }}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* Input task description */}
                <div className='form-group'>
                    <label className='enter_description'>Enter Task Description</label>
                    <textarea
                        type='text'
                        placeholder='Enter your Task Description...'
                        className='form-control'
                        style={{ marginTop: '10px' }}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                {/* Add/Update Task Buttons */}
                <div className='buttons'>
                    <button type='submit' className='btn btn-primary' id='btn'>
                        {editTaskId !== null ? 'Update Task' : 'Add Task'}
                    </button>
                </div>

            </form><br />

            {/* Search */}
            <div className='searching'>
                <input type='text' className='form-control' placeholder='Search Task...' value={searchQuery} onChange={handleSearch} />
            </div>

            <br />

            {/* Task Table */}
            <div className='tasks_table'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Task Title</th>
                            <th>Start Date</th>
                            <th>Updated Date</th>
                            <th>Edit/Update</th>
                            <th>Task Status</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTasks.map((task) => (
                            <React.Fragment key={task.id}>
                                <tr>
                                    <td><strong>{task.title}</strong></td>
                                    <td>{task.startDate}</td>
                                    <td>{task.updateDate}</td>
                                    <td>
                                        <button
                                            className='btn btn-warning'
                                            onClick={() => handleEditTask(task)}
                                        >
                                            Update
                                        </button>
                                    </td>
                                    <td>
                                        <select
                                            className='form-control'
                                            value={task.status}
                                            onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                            style={getStatusStyles(task.status)}
                                        >
                                            <option value='Pending' style={{ backgroundColor: 'white', color: 'black' }}>Pending</option>
                                            <option value='Completed' style={{ backgroundColor: 'white', color: 'black' }}>Completed</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => toggleDescription(task.id)}
                                            style={{ border: 'none', background: 'none' }}
                                        >
                                            &#x25BC;
                                        </button>
                                    </td>
                                </tr>
                                {task.showDescription && (
                                    <tr>
                                        <td colSpan="6">
                                            <div style={{ marginTop: '10px', backgroundColor: '#8080804a' }}>
                                                <strong>Description:</strong> {task.description}
                                                <br />
                                                <strong>Last Updated:</strong> {task.updateDate}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Todo;
