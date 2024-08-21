import { Box } from "@mui/material";
import categoryStyles from "../../homeStyles";

interface CategoryProps {
  title: string;
  backgroundImage: string;
  flexBasis: { xs: string; sm: string };
}

const CategoryItem: React.FC<CategoryProps> = ({
  title,
  backgroundImage,
  flexBasis,
}) => {
  return (
    <Box
      sx={{
        ...categoryStyles.categoryContainer,
        flexBasis: flexBasis,
        flexShrink: 0,
        marginBottom: { xs: "15px", sm: "0" },
        minHeight: "240px", // Ensure minimum height for visibility
      }}
    >
      <Box
        className="backgroundImage"
        sx={{
          ...categoryStyles.backgroundImage,
          backgroundImage: backgroundImage,
        }}
      />
      <Box
        className="categoryBodyContainer"
        sx={categoryStyles.categoryBodyContainer}
      >
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Box>
    </Box>
  );
};

export default CategoryItem;
