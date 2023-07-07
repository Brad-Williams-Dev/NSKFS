import React, { useEffect, useState } from "react";
import client from "../sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import { Box, Typography } from "@mui/material";
import NavBar from "./NavBar";
import "./Home.css";

const builder = imageUrlBuilder(client);

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.fetch(
          '*[_type == "news"] | order(date desc)'
        );
        setData(response);
        console.log("Sanity.io data:", response);
      } catch (error) {
        console.error("Error fetching Sanity.io data:", error);
      }
    };

    fetchData();
  }, []);

  const urlFor = (source) => {
    return builder.image(source);
  };

  return (
    <div>
      <NavBar />
      <Typography variant="h4" className="announcements">
        Announcements!
      </Typography>

      <div className="newsCardContainer">
        <div className="newsCard">
          {/* Render your data here */}
          {data && data.length > 0 ? (
            data.map((item) => (
              <Box key={item._id} className="newsBox">
                {/* Render specific fields from your schema */}
                <Typography variant="h4" className="newsTitle">
                  {item.title}
                </Typography>
                <Typography variant="subtitle2" className="newsDate">
                  {item.date}
                </Typography>
                <Typography variant="body1" className="newsContent">
                  {item.news}
                </Typography>
                {item.image && item.image.asset ? (
                  <img
                    src={urlFor(item.image.asset._ref).url()}
                    className="newsImage"
                    alt=""
                  />
                ) : null}
              </Box>
            ))
          ) : (
            <Typography variant="body1" align="center">
              No Announcements at this time....
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
