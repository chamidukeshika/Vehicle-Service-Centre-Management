import React, { useEffect, useState } from "react";
import { useVieweQuery } from "../../slices/equipmentSlice";
import { Badge, Card, Table } from "react-bootstrap";
import { FaExclamationCircle } from "react-icons/fa";

const UpcomingMaintenanceAndReplacement = () => {
  const { data: itemsData, isLoading, isError } = useVieweQuery();
  const [upcomingMaintenanceItems, setUpcomingMaintenanceItems] = useState([]);
  const [upcomingReplacementItems, setUpcomingReplacementItems] = useState([]);

  useEffect(() => {
    if (itemsData) {
      findUpcomingMaintenanceAndReplacement(itemsData);
    }
  }, [itemsData]);

  const findUpcomingMaintenanceAndReplacement = (itemsData) => {
    const today = new Date();
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const nextMonthStart = new Date(today.getFullYear(), today.getMonth() + 1, 1);

    const upcomingMaintenance = [];
    const upcomingReplacement = [];

    itemsData.forEach((item) => {
      const { name, section, mdate, rdate } = item;
      const maintenanceDate = new Date(mdate);
      const replacementDate = new Date(rdate);

      // Check if maintenance date falls within this month or the upcoming month
      if (maintenanceDate >= today && maintenanceDate < nextMonthStart) {
        upcomingMaintenance.push({ name, section, daysUntilMaintenance: getDaysUntil(maintenanceDate) });
      }

      // Check if replacement date falls within this month or the upcoming month
      if (replacementDate >= today && replacementDate < nextMonthStart) {
        upcomingReplacement.push({ name, section, daysUntilReplacement: getDaysUntil(replacementDate) });
      }
    });

    setUpcomingMaintenanceItems(upcomingMaintenance);
    setUpcomingReplacementItems(upcomingReplacement);
  };

  const getDaysUntil = (date) => {
    const today = new Date();
    const timeDifference = date.getTime() - today.getTime();
    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div><br/>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error fetching item data.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th><h5><strong>Upcoming Maintenance</strong></h5></th>
              <th><h5><strong>Upcoming Replacement</strong></h5></th>
            </tr>
          </thead>
          <tbody>
            {Math.max(upcomingMaintenanceItems.length, upcomingReplacementItems.length) > 0 ? (
              upcomingMaintenanceItems.map((maintenanceItem, index) => (
                <tr key={index}>
                  <td >
                    <Card className="custom-card" >
                      <Card.Body >
                        <Card.Title>{maintenanceItem.name}</Card.Title>
                        <Card.Text>
                          Section: {maintenanceItem.section}<br />
                          Days Until Maintenance: {maintenanceItem.daysUntilMaintenance}<br />
                          <Badge bg="danger"><FaExclamationCircle /> Urgent</Badge>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </td>
                  <td>
                    {upcomingReplacementItems[index] && (
                      <Card className="custom-card">
                        <Card.Body>
                          <Card.Title>{upcomingReplacementItems[index].name}</Card.Title>
                          <Card.Text>
                            Section: {upcomingReplacementItems[index].section}<br />
                            Days Until Replacement: {upcomingReplacementItems[index].daysUntilReplacement}<br />
                            <Badge bg="warning"><FaExclamationCircle /> Urgent</Badge>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No upcoming maintenance or replacement items for this month and the upcoming month.</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default UpcomingMaintenanceAndReplacement;
