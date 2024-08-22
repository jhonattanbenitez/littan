import React from "react";
import { Box } from "@mui/material";
import CategoryItem from "./Category"; // Adjust path as needed

interface Category {
  id: string;
  title: string;
  backgroundImage: string;
  flexBasis: { xs: string; sm: string };
  linkUrl: string;
}

interface CategoriesProps {
  categories: Category[];
}

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: { xs: "center", sm: "space-between" },
        flexDirection: { xs: "column", sm: "row" },
        gap: "15px",
      }}
    >
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          title={category.title}
          backgroundImage={category.backgroundImage}
          flexBasis={category.flexBasis}
          linkUrl={category.linkUrl}
        />
      ))}
    </Box>
  );
};

export default Categories;
