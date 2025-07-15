import { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography, List, ListItem, ListItemText, Divider,
} from "@mui/material";

const StatsPage = () => {
  const [stats, setStats] = useState([]);
  const API = process.env.REACT_APP_API_BASE;
  const token = process.env.REACT_APP_ACCESS_TOKEN;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API}/url/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (e) {
        console.log("Failed to load stats");
      }
    };
    fetchStats();
  }, []);

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <Typography variant="h5">Analytics</Typography>
      <List>
        {stats.map((item, i) => (
          <div key={i}>
            <ListItem>
              <ListItemText
                primary={`${item.shortUrl} → ${item.originalUrl}`}
                secondary={`Clicks: ${item.clickCount}`}
              />
            </ListItem>
            <ul>
              {item.clickDetails?.map((cd, j) => (
                <li key={j}>{cd.timestamp} — {cd.source}</li>
              ))}
            </ul>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
};

export default StatsPage;
