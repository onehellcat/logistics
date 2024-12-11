import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Grid, Box, Typography } from "@mui/material";

function LaptopForm() {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    serial_number: "",
    purchase_date: "",
    warranty_expiry_date: "",
    cpu: "",
    ram: "",
    screen_size: "",
    storage_type_1: "",
    storage_capacity_1: "",
    storage_type_2: "N/A",
    storage_capacity_2: "",
    storage_type_3: "N/A",
    storage_capacity_3: "",
    operating_system: "",
    comments_notes: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/laptops", formData)
      .then(() =>
        setFormData({
          brand: "",
          model: "",
          serial_number: "",
          purchase_date: "",
          warranty_expiry_date: "",
          cpu: "",
          ram: "",
          screen_size: "",
          storage_type_1: "",
          storage_capacity_1: "",
          storage_type_2: "N/A",
          storage_capacity_2: "",
          storage_type_3: "N/A",
          storage_capacity_3: "",
          operating_system: "",
          comments_notes: "",
        })
      )
      .catch((error) => console.error(error));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Add New Laptop
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Serial Number"
            name="serial_number"
            value={formData.serial_number}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="date"
            label="Purchase Date"
            name="purchase_date"
            value={formData.purchase_date}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="date"
            label="Warranty Expiry Date"
            name="warranty_expiry_date"
            value={formData.warranty_expiry_date}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="CPU"
            name="cpu"
            value={formData.cpu}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="RAM"
            name="ram"
            value={formData.ram}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Screen Size (inches)"
            name="screen_size"
            type="number"
            value={formData.screen_size}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Primary Storage Type"
            name="storage_type_1"
            value={formData.storage_type_1}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Primary Storage Capacity (GB)"
            name="storage_capacity_1"
            type="number"
            value={formData.storage_capacity_1}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Secondary Storage Type"
            name="storage_type_2"
            value={formData.storage_type_2}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Secondary Storage Capacity (GB)"
            name="storage_capacity_2"
            type="number"
            value={formData.storage_capacity_2}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Operating System"
            name="operating_system"
            value={formData.operating_system}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Comments/Notes"
            name="comments_notes"
            value={formData.comments_notes}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Add Laptop
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

function PhoneForm() {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    serial_number: "",
    purchase_date: "",
    warranty_expiry_date: "",
    storage_capacity: "",
    color: "",
    screen_size: "",
    operating_system: "",
    comments_notes: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/phones", formData)
      .then(() =>
        setFormData({
          brand: "",
          model: "",
          serial_number: "",
          purchase_date: "",
          warranty_expiry_date: "",
          storage_capacity: "",
          color: "",
          screen_size: "",
          operating_system: "",
          comments_notes: "",
        })
      )
      .catch((error) => console.error(error));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Add New Phone
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Serial Number"
            name="serial_number"
            value={formData.serial_number}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="date"
            label="Purchase Date"
            name="purchase_date"
            value={formData.purchase_date}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="date"
            label="Warranty Expiry Date"
            name="warranty_expiry_date"
            value={formData.warranty_expiry_date}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Storage Capacity (GB)"
            name="storage_capacity"
            type="number"
            value={formData.storage_capacity}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Screen Size (inches)"
            name="screen_size"
            type="number"
            value={formData.screen_size}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Operating System"
            name="operating_system"
            value={formData.operating_system}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Comments/Notes"
            name="comments_notes"
            value={formData.comments_notes}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Add Phone
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export { LaptopForm, PhoneForm };
