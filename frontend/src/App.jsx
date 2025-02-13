import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./App.css";

// Main App
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/add" element={<AddCatalogue />} />
        <Route path="/" element={<CatalogueList />} />
        <Route path="/edit/:id" element={<EditCatalogue />} />
      </Routes>
    </Router>
  );
}

export default App;

function AddCatalogue() {
  const [content, setContent] = useState({
    title: "",
    author: "",
    publisher: "",
    numberofCopies: "",

  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent({ ...content, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/post", content);
      toast.success(response.data);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add catalogue");
    }
  };

  return (
    <div>
      <Link to="/">Back to Catalogue List</Link>
      <h2>Add Catalogue</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} />
        <input name="author" placeholder="Author" onChange={handleChange} />
        <input name="publisher" placeholder="Publisher" onChange={handleChange} />
        <input name="numberofCopies" type="number" placeholder="Number of Copies" onChange={handleChange} />

        <button type="submit">Add Catalogue</button>
      </form>
    </div>
  );
}

function EditCatalogue() {
  const { id } = useParams();
  const [catalogue, setCatalogue] = useState({
    title: "",
    author: "",
    publisher: "",
    numberofCopies: "",

  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCatalogue = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/get/${id}`);
        setCatalogue(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCatalogue();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCatalogue({ ...catalogue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/update/${id}`, catalogue);
      toast.success(response.data);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update catalogue");
    }
  };

  return (
    <div>
      <Link to="/">Back to Catalogue List</Link>
      <h2>Edit Catalogue</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={catalogue.title} onChange={handleChange} />
        <input name="author" placeholder="Author" value={catalogue.author} onChange={handleChange} />
        <input name="publisher" placeholder="Publisher" value={catalogue.publisher} onChange={handleChange} />
        <input name="numberofCopies" type="number" placeholder="Number of Copies" value={catalogue.numberofCopies} onChange={handleChange} />

        <button type="submit">Update Catalogue</button>
      </form>
    </div>
  );
}

function CatalogueList() {
  const [catalogues, setCatalogues] = useState([]);

  useEffect(() => {
    const fetchCatalogues = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/get");
        setCatalogues(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCatalogues();
  }, []);

  const deleteCatalogue = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/delete/${id}`);
      setCatalogues(catalogues.filter((catalogue) => catalogue._id !== id));
      toast.success(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete catalogue");
    }
  };

  return (
    <div>
      <Link to="/add">Add Catalogue</Link>
      <h2>Catalogue List</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Number of Copies</th>

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {catalogues.map((catalogue, index) => (
            <tr key={catalogue._id}>
              <td>{index + 1}</td>
              <td>{catalogue.title}</td>
              <td>{catalogue.author}</td>
              <td>{catalogue.publisher}</td>
              <td>{catalogue.numberofCopies}</td>

              <td>
                <Link to={`/edit/${catalogue._id}`}>Edit</Link>
                <button onClick={() => deleteCatalogue(catalogue._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
