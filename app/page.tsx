import { Box } from "@mui/material";
import CategoryItem from "./components/category-item/category-item.component"; 

export default function Home() {
  const firstRowCategories = [
    {
      id: "1",
      title: "Shirts",
      backgroundImage: "url('https://placehold.co/600x400')",
    },
    {
      id: "2",
      title: "Oversize",
      backgroundImage: "url('https://placehold.co/600x400')",
    },
    {
      id: "3",
      title: "Accessories",
      backgroundImage: "url('https://placehold.co/600x400')",
    },
  ];

  const secondRowCategories = [
    {
      id: "4",
      title: "Women",
      backgroundImage: "url('https://placehold.co/600x400')",
    },
    {
      id: "5",
      title: "Men",
      backgroundImage: "url('https://placehold.co/600x400')",
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      {/* First Row - 3 Columns on larger screens, 1 column on mobile */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: "center", sm: "space-between" },
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        {firstRowCategories.map(({ id, title, backgroundImage }) => (
          <CategoryItem
            key={id}
            title={title}
            backgroundImage={backgroundImage}
            flexBasis={{ xs: "100%", sm: "30%" }}
          />
        ))}
      </Box>

      {/* Second Row - 2 Columns on larger screens, 1 column on mobile */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: "center", sm: "space-between" },
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        {secondRowCategories.map(({ id, title, backgroundImage }) => (
          <CategoryItem
            key={id}
            title={title}
            backgroundImage={backgroundImage}
            flexBasis={{ xs: "100%", sm: "45%" }}
          />
        ))}
      </Box>
    </Box>
  );
}
