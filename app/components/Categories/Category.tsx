import { Box, Link, Typography } from "@mui/material";
import categoryStyles from "../../homeStyles";


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
    <Link
      href={linkUrl}
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
        <Typography
          component={"h2"}
          sx={{ fontSize: "18px", fontColor: "#0F316D" }}
        >
          {title}
        </Typography>
        <Typography sx={{fontSize: "16px", fontColor: "#0F316D"}}>Shop Now</Typography>
      </Box>
    </Link>
  );
};

export default CategoryItem;
