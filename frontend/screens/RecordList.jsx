import React, { useState, useEffect } from "react";
import { Container, Form, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../src/components/Loader";
import { useViewRecordsQuery } from '../slices/recordApiSlice.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import  img from '../src/assets/Mlogo.png';


const RecordList = () => {
    const { data: records, isLoading, isError } = useViewRecordsQuery();
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

    // Filter and paginate records based on search term and current page
    const filteredRecords = records ? records.filter(record => {
        return (
            (record.name && record.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (record.section && record.section.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (record.desc && record.desc.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];

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
            <Container style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: "10px", padding: "20px", paddingBottom: "50px", paddingTop: "20px", margin: "auto" }}>
                <h1 className="text-Right text-black   mb-4" style={{ fontFamily: "Arial, sans-serif", fontSize: "3rem", fontWeight: "bold", marginTop: "50px"}}>Service Record List </h1>
                <img src={img} alt="logo" style={{ width: '150px', height: 'auto', marginLeft: "1100px", marginTop:"-120px" }} />

                <Form.Group controlId="search" className="mb-2" style={{ maxWidth: "100%"}}>
                    <div className="position-relative" >
                        <Form.Control
                            type="text"
                            placeholder="Search Customer Name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ paddingLeft: "40px",borderRadius:"30px",height:"40px",boxShadow: "0 2px 5px rgba(0, 65, 194,0.9)",background:"transparent"
                             }}
                        />
                        <i className="bi bi-search position-absolute" style={{ top: "50%", transform: "translateY(-50%)", left: "10px", color: "black" }}></i>
                    </div>
                </Form.Group>
                {isLoading ? (
                    <Loader />
                ) : isError ? (
                    <div>Error fetching data</div>
                ) : (
                    <Table striped hover className="mb-4" borderless style={{ textAlign: "center" ,marginTop:"50px"}}>
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Vehicle Model</th>
                                <th>Section</th>
                                <th>Total Cost</th>
                                <th>Maintenance Date</th>

                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRecords.map(record => (
                                <tr key={record.id}>
                                    <td>{record.cname}</td>
                                    <td>{record.vmodel}</td>
                                    <td>{record.section}</td>
                                    <td>{record.tcost}</td>


                                    <td>{new Date(record.outdate).toLocaleDateString()}</td>

                                    <td>
    <Button onClick={() => updateHandler(record.id)}> <i className="bi bi-pencil-square"></i></Button>
    <Button onClick={() => deleteHandler(record.id)} className="ms-2"><i className="bi bi-trash"></i></Button>
    <Button onClick={() => viewHandler(record.id)} className="ms-2"><i className="bi bi-eye"></i></Button>
</td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
                <div className="d-flex justify-content-center">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                            </li>
                            <li className="page-item"><span className="page-link">{currentPage}</span></li>
                            <li className="page-item">
                                <button className="page-link" onClick={handleNextPage} disabled={filteredRecords.length < itemsPerPage}>Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </Container>
        </div>
    )
};

export default RecordList;
