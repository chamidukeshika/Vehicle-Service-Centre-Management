import React from "react";
import maintenanceImage1 from "../assets/1.jpg";
import maintenanceImage2 from "../assets/2.jpg";
import maintenanceImage3 from "../assets/3.jpg";

const CusCard = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="card mt-5">
                        <div className="card-body">
                        <center><strong>  <h2>Welcome to Our Vehicle Service Center Dashboard!</h2></strong></center><br/>
                            <p className="card-text text-center">Here, you can access information about your vehicle maintenance, schedule appointments, and view service history.</p>
                            <br/><hr />
                            <h2 className="text-center">About Us</h2><br/>
                            <div className="row">
                                <div className="col-md-4">
                                    <img src={maintenanceImage1} className="img-fluid rounded mb-3 animate__animated animate__bounce" alt="Maintenance Image 1" />
                                </div>
                                <div className="col-md-4">
                                    <img src={maintenanceImage2} className="img-fluid rounded mb-3 animate__animated animate__bounce" alt="Maintenance Image 2" />
                                </div>
                                <div className="col-md-4">
                                    <img src={maintenanceImage3} className="img-fluid rounded mb-3 animate__animated animate__bounce" alt="Maintenance Image 3" />
                                </div>
                            </div>
                            <p>We are committed to providing top-quality vehicle maintenance and repair services to our customers. Our team of skilled technicians uses state-of-the-art equipment to ensure that your vehicle receives the best care possible.</p>
                            <p>With years of experience in the automotive industry, we understand the importance of regular maintenance in keeping your vehicle running smoothly and efficiently. Whether you need an oil change, brake service, or major repair, you can trust us to get the job done right.</p>
                            <p>At our vehicle service center, customer satisfaction is our top priority. We strive to provide exceptional service and build long-lasting relationships with our customers. Thank you for choosing us for all your vehicle maintenance needs!</p>
                            {/* You can add more content related to the about details of your vehicle service center */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CusCard;
