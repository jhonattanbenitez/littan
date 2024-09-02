import { Box } from "@mui/material";
import Categories from "./components/Categories/Categories"; 

export default function Home() {
  const firstRowCategories = [
    {
      id: "1",
      title: "Shirts",
      backgroundImage: "url('https://placehold.co/600x400')",
      flexBasis: { xs: "100%", sm: "30%" },
      linkUrl: "/shirts",
    },
    {
      id: "2",
      title: "Oversize",
      backgroundImage: "url('https://placehold.co/600x400')",
      flexBasis: { xs: "100%", sm: "30%" },
      linkUrl: "/oversize",
    },
    {
      id: "3",
      title: "Accessories",
      backgroundImage: "url('https://placehold.co/600x400')",
      flexBasis: { xs: "100%", sm: "30%" },
      linkUrl: "/accessories",
    },
  ];

  const secondRowCategories = [
    {
      id: "4",
      title: "Women",
      backgroundImage: "url('https://placehold.co/600x400')",
      flexBasis: { xs: "100%", sm: "45%" },
      linkUrl: "/women",
    },
    {
      id: "5",
      title: "Men",
      backgroundImage: "url('https://placehold.co/600x400')",
      flexBasis: { xs: "100%", sm: "45%" },
      linkUrl: "/men",
    },
  ];

  return (
    <Box>
      {/* Main Content */}
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: "15px", mt: 10 }}
      >
        {/* First Row Categories */}
        <Categories categories={firstRowCategories} />

        {/* Second Row Categories */}
        <Categories categories={secondRowCategories} />
      </Box>
    </Box>
  );
}
