/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Tabs,
  Tab,
} from "@mui/material";

function DeviceList({ deviceType }) {
  const [devices, setDevices] = useState([]);
  const [openDetails, setOpenDetails] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [updatedDevice, setUpdatedDevice] = useState({
    assigned_to: "",
    status: "",
    assignment_date: "",
  });
  const [activeTab, setActiveTab] = useState(0); // State to manage the active tab

  // Fetch devices from the API
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/${deviceType}`)
      .then((response) => setDevices(response.data))
      .catch((error) => console.error(error));
  }, [deviceType]);

  const handleViewDetails = (device) => {
    setSelectedDevice(device);
    setOpenDetails(true);
  };

  const handleCloseDetails = () => setOpenDetails(false);

  const handleEdit = (device) => {
    setSelectedDevice(device);
    setUpdatedDevice({
      assigned_to: device.assigned_to,
      status: device.assigned_to ? "assigned" : "available", // Automatically set status based on assignment
      assignment_date: device.assignment_date || "", // Set current assignment date if exists
    });
    setOpenEdit(true);
  };

  const handleCloseEdit = () => setOpenEdit(false);

  // Save changes function for editing a device
  const handleSaveChanges = () => {
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    const { assigned_to, assignment_date } = updatedDevice;

    // Case where we are removing the current owner or assigning a new one
    if (
      selectedDevice.assigned_to &&
      assigned_to !== selectedDevice.assigned_to
    ) {
      // If the current owner is being replaced, set their END date
      const updatedHistoryEntry = `Assigned To: ${selectedDevice.assigned_to}, START: ${selectedDevice.assignment_date} | END: ${currentDate}`;
      updatedDevice.user_history = `${
        selectedDevice.user_history || ""
      }\n${updatedHistoryEntry}`;
    }

    // Only update assignment if a new owner is being assigned
    if (assigned_to && assigned_to !== selectedDevice.assigned_to) {
      // If the assignment date is not already set, assign it
      if (!assignment_date) {
        updatedDevice.assignment_date = currentDate;
      }

      // No need to add the new owner to the history immediately
      // We will add the new owner when they are reassigned in the future
    }

    // Send the update request to the server
    axios
      .put(
        `http://localhost:5000/api/${deviceType}/${selectedDevice.serial_number}`,
        updatedDevice
      )
      .then((response) => {
        console.log("Device updated:", response.data);
        setDevices((prevDevices) =>
          prevDevices.map((device) =>
            device.serial_number === selectedDevice.serial_number
              ? { ...device, ...updatedDevice }
              : device
          )
        );
        setOpenEdit(false);
      })
      .catch((error) => {
        console.error("Error updating device:", error);
      });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "green";
      case "assigned":
        return "blue";
      case "in repair":
        return "orange";
      case "lost":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h6" gutterBottom>
        {deviceType === "laptops" ? "Laptops" : "Phones"}
      </Typography>

      {/* Device Cards */}
      <Grid container spacing={3}>
        {devices.map((device) => (
          <Grid item xs={12} sm={6} md={4} key={device.serial_number}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="textPrimary">
                  {device.brand} {device.model}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Serial: {device.serial_number}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Assigned to: {device.assigned_to || "N/A"}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Warranty Expires:{" "}
                  {device.warranty_expiry_date.substring(0, 10)}
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  Status:{" "}
                  <span style={{ color: getStatusColor(device.status) }}>
                    {device.status}
                  </span>
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleViewDetails(device)}>
                  View Details
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => handleEdit(device)}>
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* View Device Details Dialog */}
      {openDetails && selectedDevice && (
        <Dialog open={openDetails} onClose={handleCloseDetails}>
          <DialogTitle>Device Details</DialogTitle>
          <DialogContent>
            {/* Tabs Component for different pages */}
            <Tabs
              value={activeTab}
              onChange={(e, newTab) => setActiveTab(newTab)}
              indicatorColor="primary"
              textColor="primary"
              centered
              variant="fullWidth"
              sx={{
                "& .MuiTab-root": {
                  fontSize: "0.8rem", // Make tab text smaller
                  minWidth: "auto", // Avoid wide tab buttons
                },
                "& .MuiTabs-flexContainer": {
                  justifyContent: "space-around", // Space out the tabs evenly
                },
              }}>
              <Tab label="Laptop Specs" />
              <Tab label="Previous Ownership" />
              <Tab label="Maintenance" />
              <Tab label="Installed Software" />
            </Tabs>

            {/* Conditional Content for each tab */}
            <Box sx={{ padding: 2 }}>
              {/* Laptop Specs Tab */}
              {activeTab === 0 && (
                <Box>
                  {/* Conditionally render "Assigned To" and "Assignment Date" */}
                  {selectedDevice.assigned_to !== "N/A" &&
                    selectedDevice.assigned_to && (
                      <>
                        <Typography variant="h6" gutterBottom>
                          Assigned To: {selectedDevice.assigned_to}
                        </Typography>
                        <Typography variant="body1" sx={{ marginBottom: 3 }}>
                          <strong>Assignment Date:</strong>{" "}
                          {selectedDevice.assignment_date || "N/A"}
                        </Typography>
                      </>
                    )}

                  <Typography variant="h6" gutterBottom>
                    Laptop Specifications
                  </Typography>
                  <Box sx={{ marginTop: 2 }}>
                    <Typography variant="body1">
                      <strong>Brand:</strong> {selectedDevice.brand}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Model:</strong> {selectedDevice.model}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Serial Number:</strong>{" "}
                      {selectedDevice.serial_number}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Purchase Date:</strong>{" "}
                      {selectedDevice.purchase_date.substring(0, 10)}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Warranty Expiry:</strong>{" "}
                      {selectedDevice.warranty_expiry_date.substring(0, 10)}
                    </Typography>
                  </Box>

                  {/* Hardware and Software */}
                  <Box sx={{ marginTop: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Hardware
                    </Typography>
                    <Typography variant="body1">
                      <strong>CPU:</strong> {selectedDevice.cpu}
                    </Typography>
                    <Typography variant="body1">
                      <strong>RAM:</strong> {selectedDevice.ram}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Screen Size:</strong> {selectedDevice.screen_size}
                      "
                    </Typography>
                    <Typography variant="body1">
                      <strong>Storage 1:</strong>{" "}
                      {selectedDevice.storage_type_1}{" "}
                      {selectedDevice.storage_capacity_1} GB
                    </Typography>
                    {selectedDevice.storage_type_2 !== "N/A" && (
                      <Typography variant="body1">
                        <strong>Storage 2:</strong>{" "}
                        {selectedDevice.storage_type_2}{" "}
                        {selectedDevice.storage_capacity_2} GB
                      </Typography>
                    )}
                    {selectedDevice.storage_type_3 !== "N/A" && (
                      <Typography variant="body1">
                        <strong>Storage 3:</strong>{" "}
                        {selectedDevice.storage_type_3}{" "}
                        {selectedDevice.storage_capacity_3} GB
                      </Typography>
                    )}
                    <Typography variant="body1">
                      <strong>Operating System:</strong>{" "}
                      {selectedDevice.operating_system}
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* Previous Ownership Tab */}
              {activeTab === 1 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Previous Ownership
                  </Typography>

                  {/* Split the user history and display each previous owner's info */}
                  {selectedDevice.user_history ? (
                    selectedDevice.user_history
                      .trim()
                      .split("\n")
                      .map((entry, index) => {
                        // Log each entry to inspect its format
                        console.log("Processing history entry:", entry);

                        // Regex for capturing assignment details
                        const assignedToRegex =
                          /Assigned To:\s*([^\|,]+),\s*START:\s*([\d\-T:.]+)(?:\s*\|\s*END:\s*([\d\-T:.]+))?/;
                        const match = entry.match(assignedToRegex);

                        if (match) {
                          const assignedTo = match[1]?.trim() || "N/A";
                          const startDateRaw = match[2];
                          const endDateRaw = match[3];

                          // Parse start and end dates explicitly, logging for visibility
                          const startDate = Date.parse(startDateRaw)
                            ? new Date(startDateRaw)
                            : null;
                          const endDate = Date.parse(endDateRaw)
                            ? new Date(endDateRaw)
                            : null;

                          console.log("Parsed Start Date:", startDate);
                          console.log("Parsed End Date:", endDate);

                          // Format date for display, or show "N/A" if invalid
                          const formatDate = (dateString) => {
                            let date = Date.parse(dateString);

                            // If parsing fails, try adding a time component
                            if (isNaN(date) && dateString) {
                              date = Date.parse(`${dateString}T00:00:00`);
                            }

                            // Convert to a Date object if valid, otherwise return "N/A"
                            const validDate = date ? new Date(date) : null;
                            return validDate && !isNaN(validDate)
                              ? validDate.toLocaleDateString()
                              : "N/A"; // Fallback if still invalid
                          };

                          // Usage
                          const formattedStartDate = formatDate(startDateRaw);
                          const formattedEndDate = formatDate(endDateRaw);

                          return (
                            <Box
                              key={index}
                              sx={{
                                marginBottom: 2,
                                padding: 2,
                                border: "1px solid #ddd",
                                borderRadius: 1,
                              }}>
                              <Typography variant="body1" fontWeight="bold">
                                Assigned To: {assignedTo}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                Assignment Date Range: {formattedStartDate} -{" "}
                                {formattedEndDate}
                              </Typography>
                            </Box>
                          );
                        }
                        return null;
                      })
                  ) : (
                    <Typography variant="body1">
                      No previous ownership records
                    </Typography>
                  )}
                </Box>
              )}

              {/* Maintenance Tab */}
              {activeTab === 2 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Maintenance Information
                  </Typography>
                  <Typography variant="body1">
                    <strong>Maintenance Date:</strong>{" "}
                    {selectedDevice.maintenance_date.substring(0, 10) || "N/A"}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Issues Reported:</strong>{" "}
                    {selectedDevice.issues_reported || "No issues reported"}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Repair Status:</strong>{" "}
                    {selectedDevice.repair_status || "N/A"}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Accessories Included:</strong>{" "}
                    {selectedDevice.accessories_included || "None"}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Comments/Notes:</strong>{" "}
                    {selectedDevice.comments_notes || "None"}
                  </Typography>
                </Box>
              )}

              {/* Installed Software Tab */}
              {activeTab === 3 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Installed Software
                  </Typography>
                  <Typography variant="body1">
                    <strong>Installed Software:</strong>{" "}
                    {selectedDevice.installed_software || "None"}
                  </Typography>
                </Box>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDetails} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Assign Device Dialog */}
      {openEdit && (
        <Dialog open={openEdit} onClose={handleCloseEdit}>
          <DialogTitle>
            {selectedDevice.model}
            {updatedDevice.assigned_to ? " Assigned to" : " Assign to"}{" "}
          </DialogTitle>
          <DialogContent>
            <TextField
              label={updatedDevice.assigned_to ? " Assigned to" : " Assign to"}
              fullWidth
              value={updatedDevice.assigned_to}
              onChange={(e) =>
                setUpdatedDevice({
                  ...updatedDevice,
                  assigned_to: e.target.value,
                  status: e.target.value ? "assigned" : "available", // Dynamically update status
                  assignment_date: e.target.value
                    ? new Date().toISOString().split("T")[0]
                    : updatedDevice.assignment_date, // Automatically set assignment date
                })
              }
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleSaveChanges();
                setOpenEdit(false); // Close the dialog after saving
              }}
              color="primary">
              {updatedDevice.assigned_to ? "Update Assignment" : "Assign"}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default DeviceList;
