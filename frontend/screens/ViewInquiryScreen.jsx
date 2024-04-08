import { useEffect } from "react";
import { useViewiQuery, useDeleteiMutation } from "../slices/inquirySlice";
import { Button, Table } from "react-bootstrap";
import { toast } from "react-toastify"; // Import toast for notifications

const ViewInquiryScreen = ({ customerId }) => {
    const { data, error, isLoading, refetch } = useViewiQuery({ customerId });

    useEffect(() => {
        refetch(); // Fetch data when the component mounts
    }, [customerId, refetch]); // Add customerId to the dependencies array

    const [deletei] = useDeleteiMutation(); // Mutation function for deleting inquiry

    const handleDelete = async (id) => {
        try {
            await deletei(id).unwrap();
            toast.success("Inquiry deleted successfully");
            refetch(); // Refetch inquiries after deletion
        } catch (error) {
            toast.error('Failed to delete inquiry');
            console.error('Error:', error);
        }
    };

    return (
        <div>
             <div style={{
                textAlign: 'center', // Centers the text inside the div
                color: '#000000', // Sets text color to black
                // Using textShadow to simulate a white stroke effect. Adjust as necessary.
                textShadow: `
                    -1px -1px 0 #FFFFFF, 
                    1px -1px 0 #FFFFFF, 
                    -1px 1px 0 #FFFFFF, 
                    1px 1px 0 #FFFFFF,
                    -2px 0 0 #FFFFFF,
                    2px 0 0 #FFFFFF,
                    0 -2px 0 #FFFFFF,
                    0 2px 0 #FFFFFF`, // More shadows for stronger effect
                width: '100%', // Ensures the div takes the full width
                display: 'flex', // Using flex to center the content
                justifyContent: 'center', // Centers the content horizontally
                alignItems: 'center' // Centers the content vertically
            }}>
                <h1>View Your Inquiries</h1>
            </div>
            
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data && (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact Number</th>
                            <th>Inquiry Type</th>
                            <th>Service Date</th>
                            <th>Inquiry Subject</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((inquiry) => (
                            <tr key={inquiry._id}>
                                <td>{inquiry.name}</td>
                                <td>{inquiry.email}</td>
                                <td>{inquiry.ContactNumber}</td>
                                <td>{inquiry.inquiryType}</td>
                                <td>{inquiry.pdate}</td>
                                <td>{inquiry.inquirySubject}</td>
                                <td>{inquiry.description}</td>
                                <td>
                                    <Button
                                        variant="primary"
                                        onClick={() => handleEdit(inquiry._id)}
                                    >
                                        Edit
                                    </Button>{" "}
                                    <Button
                                        variant="danger"
                                        onClick={() => handleDelete(inquiry._id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default ViewInquiryScreen;
