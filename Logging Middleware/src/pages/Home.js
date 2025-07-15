import { Card, CardContent, Typography } from "@mui/material";
import UrlInputForm from "../components/UrlInputForm";
import UrlList from "../components/UrlList";
import { useState } from "react";

const Home = () => {
  const [resultData, setResultData] = useState([]);

  return (
    <Card sx={{ mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          AffordMed URL Shortener
        </Typography>
        <UrlInputForm setResultData={setResultData} />
        <UrlList resultData={resultData} />
      </CardContent>
    </Card>
  );
};

export default Home;
