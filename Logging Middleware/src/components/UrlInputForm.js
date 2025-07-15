import {
  TextField, Button, Grid, Snackbar,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

const UrlInputForm = ({ setResultData }) => {
  const [inputs, setInputs] = useState([{ longUrl: "", validity: "", custom: "" }]);
  const [error, setError] = useState("");

  const API = process.env.REACT_APP_API_BASE;
  const token = process.env.REACT_APP_ACCESS_TOKEN;

  const validUrl = (url) => /^https?:\/\/.+\..+/.test(url);

  const handleChange = (index, field, value) => {
    const updated = [...inputs];
    updated[index][field] = value;
    setInputs(updated);
  };

  const addRow = () => {
    if (inputs.length < 5) setInputs([...inputs, { longUrl: "", validity: "", custom: "" }]);
  };

  const handleSubmit = async () => {
    const payload = inputs
      .filter((row) => validUrl(row.longUrl))
      .map((row) => ({
        longUrl: row.longUrl.trim(),
        validity: parseInt(row.validity) || 30,
        customCode: row.custom.trim() || undefined,
      }));

    try {
      const res = await axios.post(`${API}/url/shorten`, { urls: payload }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResultData(res.data);
    } catch (err) {
      setError("Error shortening URLs.");
    }
  };

  return (
    <>
      {inputs.map((input, idx) => (
        <Grid container spacing={2} key={idx} sx={{ mb: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField label="Long URL" fullWidth value={input.longUrl}
              onChange={(e) => handleChange(idx, "longUrl", e.target.value)} />
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField label="Validity (min)" fullWidth value={input.validity}
              onChange={(e) => handleChange(idx, "validity", e.target.value)} />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField label="Custom Code" fullWidth value={input.custom}
              onChange={(e) => handleChange(idx, "custom", e.target.value)} />
          </Grid>
        </Grid>
      ))}
      <Button onClick={addRow} disabled={inputs.length >= 5}>+ Add URL</Button>
      <Button variant="contained" onClick={handleSubmit}
        disabled={inputs.some((i) => !validUrl(i.longUrl))}>Shorten</Button>
      <Snackbar open={!!error} autoHideDuration={3000} onClose={() => setError("")} message={error} />
    </>
  );
};

export default UrlInputForm;
