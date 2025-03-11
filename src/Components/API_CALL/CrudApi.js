import axios from "axios";
import { useEffect, useState } from "react";

const CrudApi = () => {
    const [deleteModal, setDeleteModal] = useState(false);
    const [editaddModal, setEditAddModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [data, setData] = useState({ todo_list: [] });
    const [title, setTitle] = useState("");
    const [description, setDesc] = useState("");
    const [id, setId] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const handleClose = () => {
        setEditAddModal(false);
        setDeleteModal(false);
        setId("");
        setTitle("");
        setDesc("");
        setEditMode(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get("https://akashsir.in/myapi/crud/todo-list-api.php")
            .then(res => setData(res.data));
    };

    const handleSubmit = () => {
        const formData = new FormData();

        if (editMode) {
            formData.append("todo_title", title);
            formData.append("todo_details", description);
            formData.append("todo_id", id);
            axios.post("https://akashsir.in/myapi/crud/todo-update-api.php", formData)
                .then(() => {
                    setEditAddModal(false);
                    fetchData();
                });
        } else {
            formData.append("todo_title", title);
            formData.append("todo_details", description);
            axios.post("https://akashsir.in/myapi/crud/todo-add-api.php", formData)
                .then(res => {
                    if (res.data.flag === "1") {
                        setEditAddModal(false);
                        setTitle("");
                        setDesc("");
                        fetchData();
                    }
                });
        }
    };

    const handleEdit = (id) => {
        axios.get(`https://akashsir.in/myapi/crud/todo-detail-api.php?todo_id=${id}`)
            .then(res => {
                setEditAddModal(true);
                setEditMode(true);
                setId(id);
                setTitle(res.data.todo_title);
                setDesc(res.data.todo_details);
            });
    };

    const handleDelete = (id) => {
        setDeleteModal(true);
        setId(id);
    };

    const deleteData = () => {
        const formData = new FormData();
        formData.append("todo_id", id);
        axios.post("https://akashsir.in/myapi/crud/todo-delete-api.php", formData)
            .then(() => {
                setDeleteModal(false);
                setId("");
                fetchData();
            });
    };

    const dataPerPage = 5;
    const LastIndexOfData = currentPage * dataPerPage;
    const FirstIndexOfData = LastIndexOfData - dataPerPage;
    const CurrentData = data.todo_list && data.todo_list.slice(FirstIndexOfData, LastIndexOfData);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-primary fw-bold">📌 To-Do List Manager</h2>
                <a href="/" className="btn btn-secondary">🏠 Home</a>
            </div>

            <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-success shadow" onClick={() => setEditAddModal(true)}>➕ Add New Task</button>
            </div>

            <div className="table-responsive">
                <table className="table table-hover border rounded">
                    <thead className="table-primary">
                        <tr>
                            <th>ID</th>
                            <th>To-Do Title</th>
                            <th>Details</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {CurrentData && CurrentData.length > 0 ? (
                            CurrentData.map((value) => (
                                <tr key={value.todo_id}>
                                    <td className="fw-bold">{value.todo_id}</td>
                                    <td>{value.todo_title}</td>
                                    <td>{value.todo_details}</td>
                                    <td>{value.todo_date}</td>
                                    <td>
                                        <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(value.todo_id)}>✏️ Edit</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(value.todo_id)}>🗑 Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center fw-bold text-danger">No Records Found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <nav>
                <ul className="pagination justify-content-center">
                    {Array.from({ length: Math.ceil(data.todo_list.length / dataPerPage) }, (_, i) => (
                        <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                            <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                        </li>
                    ))}
                </ul>
            </nav>

            {editaddModal && (
                <div className="modal d-block bg-dark bg-opacity-50" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{editMode ? "Edit Task" : "Add New Task"}</h5>
                                <button className="btn-close" onClick={handleClose}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label">Title</label>
                                        <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Details</label>
                                        <textarea className="form-control" value={description} onChange={(e) => setDesc(e.target.value)}></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={handleClose}>Cancel</button>
                                <button className="btn btn-success" onClick={handleSubmit}>{editMode ? "Update" : "Save"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {deleteModal && (
                <div className="modal d-block bg-dark bg-opacity-50" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-danger">⚠️ Confirm Delete</h5>
                                <button className="btn-close" onClick={handleClose}></button>
                            </div>
                            <div className="modal-body text-center">
                                <h5>Are you sure you want to delete this task?</h5>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button className="btn btn-secondary" onClick={handleClose}>No</button>
                                <button className="btn btn-danger ms-3" onClick={deleteData}>Yes, Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CrudApi;
