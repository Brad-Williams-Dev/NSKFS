import React, { useEffect, useState } from "react";
import {
  Avatar,
  Typography,
  Grid,
  Divider,
  Button,
  TextField,
} from "@mui/material";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, update, set } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "../firebase";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [storageInitialized, setStorageInitialized] = useState(false);
  const [editing, setEditing] = useState(false);
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    // Initialize Firebase

    const app = initializeApp(firebaseConfig);

    // Initialize Storage
    const storage = getStorage(app);
    if (storage) {
      setStorageInitialized(true);
    }

    // Retrieve user data from the database
    const userId = getUserId();
    if (userId) {
      const db = getDatabase(app);
      const userRef = ref(db, `users/${userId}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        setUserData(data);
      });

      // Clean up the event listener
      return () => {
        // Unsubscribe from the database listener
      };
    }
  }, []);

  const handleInputChange = (event) => {
    setInputValues({
      ...inputValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditToggle = () => {
    if (editing) {
      // save changes to database
      handleUpdate();
    } else {
      // prepare to edit profile by loading current user data to inputValues
      setInputValues(userData);
    }

    // toggle editing state
    setEditing(!editing);
  };

  const getUserId = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    return user ? user.uid : null;
  };

  const handleUpdate = () => {
    // Update user data in the database
    const userId = getUserId();
    if (userId) {
      const app = initializeApp(firebaseConfig);
      const db = getDatabase(app);
      const userRef = ref(db, `users/${userId}`);
      update(userRef, userData);
    }
  };

  const handlePictureUpload = async (event) => {
    console.log("handlePictureUpload called");
    const file = event.target.files[0];
    console.log("Selected file:", file);
    const storage = getStorage();
    const userId = getUserId();
    if (storageInitialized && file && userId) {
      const storageReference = storageRef(
        storage,
        `profile-pictures/${userId}`
      );
      const uploadTaskSnapshot = await uploadBytes(storageReference, file);
      const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);

      // Update the profile picture URL in the user data
      const updatedUserData = {
        ...userData,
        profilePicture: downloadURL,
      };

      const app = initializeApp(firebaseConfig);
      const db = getDatabase(app);
      const userRef = ref(db, `/users/${userId}`); // Add root reference '/'
      set(userRef, updatedUserData);

      // Update the state with the updated user data
      setUserData(updatedUserData);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container spacing={2} alignItems="center" sx={{ p: 4 }}>
      <Grid item>
        <Avatar
          alt="Profile Picture"
          src={
            userData.profilePicture || "/path/to/default-profile-picture.jpg"
          }
          sx={{ width: 120, height: 120, boxShadow: 1 }}
        />
        <input type="file" onChange={handlePictureUpload} />
      </Grid>
      <Grid item xs={12} sm>
        <Typography variant="h4">
          {editing ? (
            <TextField
              name="userName"
              value={inputValues.userName}
              onChange={handleInputChange}
            />
          ) : (
            userData.userName
          )}
        </Typography>
        <Typography variant="h5">
          {editing ? (
            <TextField
              name="firstName"
              value={inputValues.firstName}
              onChange={handleInputChange}
            />
          ) : (
            userData.firstName
          )}{" "}
          {editing ? (
            <TextField
              name="lastName"
              value={inputValues.lastName}
              onChange={handleInputChange}
            />
          ) : (
            userData.lastName
          )}
        </Typography>
        <Typography variant="subtitle1">
          Location:{" "}
          {editing ? (
            <TextField
              name="location"
              value={inputValues.location}
              onChange={handleInputChange}
            />
          ) : (
            userData.location
          )}
        </Typography>
      </Grid>
      <Divider sx={{ width: "100%", my: 4 }} />
      <Grid item xs={12}>
        <Typography variant="h5">About Me</Typography>
        <Typography variant="body1">
          {editing ? (
            <TextField
              name="aboutMe"
              value={inputValues.aboutMe}
              onChange={handleInputChange}
              multiline
            />
          ) : (
            userData.aboutMe
          )}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleEditToggle}>
          {editing ? "Save" : "Edit"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default Profile;
