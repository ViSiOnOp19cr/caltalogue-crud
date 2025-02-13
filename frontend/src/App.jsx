import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [catalogues, setCatalogues] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publisher: '',
    numberofCopies: '',
    Price: ''
  });

  useEffect(() => {
    fetchCatalogues();
  }, []);

  const fetchCatalogues = async () => {
    try {
      const response = await axios.get('/api/get');
      setCatalogues(response.data);
    } catch (error) {
      console.error('Error fetching catalogues:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/post', formData);
      fetchCatalogues();
      setShowForm(false);
      setFormData({
        title: '',
        author: '',
        publisher: '',
        numberofCopies: '',
        Price: ''
      });
    } catch (error) {
      console.error('Error adding catalogue:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/delete/${id}`);
      fetchCatalogues();
    } catch (error) {
      console.error('Error deleting catalogue:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const updatedFormData = {
        title: formData.title,
        author: formData.author,
        publisher: formData.publisher,
        numberofCopies: formData.numberofCopies,
        Price: formData.Price
      };
      await axios.put(`/api/update/${id}`, updatedFormData);
      fetchCatalogues();
      setShowForm(false);
      setFormData({
        title: '',
        author: '',
        publisher: '',
        numberofCopies: '',
        Price: ''
      });
    } catch (error) {
      console.error('Error updating catalogue:', error);
    }
  };

  return (
    <div>
      <button onClick={() => setShowForm(true)}>Add Catalogue</button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="publisher"
            placeholder="Publisher"
            value={formData.publisher}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="numberofCopies"
            placeholder="Number of Copies"
            value={formData.numberofCopies}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="Price"
            placeholder="Price"
            value={formData.Price}
            onChange={handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
      )}
      <div>
        {catalogues.map((catalogue) => (
          <div key={catalogue._id}>
            <h3>{catalogue.title}</h3>
            <p>Author: {catalogue.author}</p>
            <p>Publisher: {catalogue.publisher}</p>
            <p>Number of Copies: {catalogue.numberofCopies}</p>
            <p>Price: {catalogue.Price}</p>
            <button onClick={() => handleDelete(catalogue._id)}>Delete</button>
            <button onClick={() => handleUpdate(catalogue._id)}>Update</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
