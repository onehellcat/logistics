import React, { useState } from "react";
import {
  Container,
  Typography,
  CssBaseline,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import DeviceList from "./components/DeviceList";
import { LaptopForm, PhoneForm } from "./components/DeviceForm";

function App() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom align="center" sx={{ mt: 4 }}>
          Device Management Dashboard
        </Typography>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={activeTab} onChange={handleTabChange} centered>
            <Tab label="Laptops" />
            <Tab label="Phones" />
          </Tabs>
        </Box>
        <Box sx={{ mt: 4 }}>
          {activeTab === 0 && (
            <>
              <LaptopForm />
              <DeviceList deviceType="laptops" />
            </>
          )}
          {activeTab === 1 && (
            <>
              <PhoneForm />
              <DeviceList deviceType="phones" />
            </>
          )}
        </Box>
      </Container>
    </div>
  );
}

export default App;
