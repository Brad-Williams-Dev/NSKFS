import React from "react";
import { useEffect, useState } from "react";
import client from "../sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import NavBar from "./NavBar";
import "./Events.css";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

const Events = () => {
  const [data, setData] = useState(null);
  const builder = imageUrlBuilder(client);
  const [userData, setUserData] = useState(null);
  const currentDate = new Date();

  const getUserId = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    return user ? user.uid : null;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "bassTournament"]`; // Update the query based on your schema
        const result = await client.fetch(query);
        setData(result);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Initialize Firebase

    const app = initializeApp(firebaseConfig);

    // Retrieve user data from the database
    const userId = getUserId();

    if (userId) {
      const db = getDatabase(app);
      const userRef = ref(db, `users/${userId}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        setUserData(data);
      });
    }
  }, []);

  const urlFor = (source) => {
    return builder.image(source);
  };

  const renderLink = (item) => {
    const eventDate = new Date(item.date);
    const oneDayBefore = new Date(eventDate);
    oneDayBefore.setDate(eventDate.getDate() - 1);
    const oneDayAfter = new Date(eventDate);
    oneDayAfter.setDate(eventDate.getDate() + 1);

    if (currentDate < oneDayBefore) {
      // Render the sign-up page link
      return (
        <a className="link" href={item.signup}>
          Sign Up
        </a>
      );
    } else if (currentDate > oneDayAfter) {
      // Render the final leaderboard link
      return (
        <a className="link" href={item.results}>
          Final Leaderboard
        </a>
      );
    } else {
      return null; // No link to render
    }
  };

  return (
    <div>
      <NavBar userInfo={userData} />
      <div className="main-body">
        <h1>Upcoming Events</h1>
        <div className="tournament-card">
          {data && data.length > 0 ? (
            data.map((item) => (
              <div key={item._id}>
                <img
                  src={urlFor(item.image.asset._ref).url()}
                  alt=""
                  className="tournament-img"
                />
                <h1>{item.title}</h1>
                <h2>{item.date}</h2>
                <h2>{item.location}</h2>
                <p>{item.info}</p>
                <p>Entry Fee ${item.entryFee}</p>
                {item.lunkerPool && <p>Lunker Pool: ${item.lunkerPool}</p>}
                {renderLink(item)}
              </div>
            ))
          ) : (
            <p>No Events Scheduled...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
