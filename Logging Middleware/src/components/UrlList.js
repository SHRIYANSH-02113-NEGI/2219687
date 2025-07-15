import { Typography } from "@mui/material";

const UrlList = ({ resultData }) => {
  if (!resultData.length) return null;

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <Typography variant="h6">Shortened URLs</Typography>
      {resultData.map((row, i) => (
        <div key={i}>
           <a href={`/${row.customCode || row.shortCode}`}>{row.shortUrl}</a> — valid {row.expiry} mins
        </div>
      ))}
    </div>
  );
};

export default UrlList;
