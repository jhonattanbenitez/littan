"use client"
import React from "react";
import { Button } from "@mui/material";
import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils";
import SHOP_DATA from "../shop-data";

const AdminUploadPage = () => {
  const handleUpload = async () => {
    try {
      await addCollectionAndDocuments("categories", SHOP_DATA);
      console.log("Data uploaded successfully");
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  return (
    <div>
      <Button onClick={handleUpload} sx={{mt:10}}>Upload Data to Firestore</Button>
    </div>
  );
};

export default AdminUploadPage;
