import React, { useState, useEffect } from "react";
import { Container, Form, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../src/components/Loader";
import { useViewQuery } from '../slices/equipmentSlice.js';
import 'bootstrap-icons/font/bootstrap-icons.css';


const ViewEquipment = () => {
  const { data: items } = useViewQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(1); // Reset to first page whenever search term changes
  }, [searchTerm]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  }

  const filteredItems = items && items.length > 0 ? items.filter(item => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }) : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems ? filteredItems.slice(indexOfFirstItem, indexOfLastItem) : [];

  const updateHandler = async (id) => {
    try {
      navigate('/update');
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || err.message || 'An error occurred');
    }
  }

  const deleteHandler = async (id) => {
    console.log(`Deleting item with id ${id}`);
    // Add your delete logic here
  }

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <Container style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: "10px", padding: "20px", paddingBottom: "50px", paddingTop: "20px", margin: "auto" }}>
        <h1 className="text-center text-white mb-4">View Equipments</h1>
        <Form.Group controlId="search" className="mb-2" style={{ maxWidth: "400px" }}>
          <div className="position-relative">
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: "40px" }}
            />
            <i className="bi bi-search position-absolute" style={{ top: "50%", transform: "translateY(-50%)", left: "10px", color: "black" }}></i>
          </div>
        </Form.Group>
        {currentItems.length > 0 ? (
          <Table striped hover className="mb-4" borderless style={{ textAlign: "center" }} >
            <thead>
              <tr>
                <th>Name</th>
                <th>Section</th>
                <th>Price</th>
                <th>Manufacture Date</th>
                <th>Rental Date</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.section}</td>
                  <td>{item.price}</td>
                  <td>{new Date(item.mdate).toLocaleDateString()}</td>
                  <td>{new Date(item.rdate).toLocaleDateString()}</td>
                  <td>{item.desc}</td>
                  <td>
                    <Button onClick={() => updateHandler(item.id)}> <i className="bi bi-pencil-square"></i></Button>
                    <Button onClick={() => deleteHandler(item.id)} className="ms-2"><i className="bi bi-trash"></i></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Loader />
        )}
        <div className="d-flex justify-content-center">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
              </li>
              <li className="page-item"><span className="page-link">{currentPage}</span></li>
              <li className="page-item">
                <button className="page-link" onClick={handleNextPage} disabled={currentItems.length < itemsPerPage}>Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </div>
  )
};

export default ViewEquipment;
