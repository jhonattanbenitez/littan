import { Box } from "@mui/material";
import categoryStyles from "../../homeStyles";
import Link from "next/link";
import { link } from "fs";

interface CategoryProps {
  title: string;
  backgroundImage: string;
  flexBasis: { xs: string; sm: string };
  linkUrl: string;
}

const CategoryItem: React.FC<CategoryProps> = ({
  title,
  backgroundImage,
  flexBasis,
  linkUrl
}) => {
  return (
    <Box
      sx={{
        ...categoryStyles.categoryContainer,
        flexBasis: flexBasis,
        flexShrink: 0,
        marginBottom: { xs: "15px", sm: "0" },
        minHeight: "240px", // Ensure minimum height for visibility
        backgroundColor: "#456FA5",
        borderRadius: "5px",
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
        <Link href={linkUrl}>
        <p>Shop Now</p>
        </Link>
      </Box>
    </Box>
  );
};

export default CategoryItem;
