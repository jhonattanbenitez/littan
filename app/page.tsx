import { Box } from "@mui/material";
import Categories from "./components/Categories/Categories"; 

export default function Home() {
  const firstRowCategories = [
    {
      id: "1",
      title: "Shirts",
      backgroundImage:
        "url('https://res.cloudinary.com/dnihs6uxl/image/upload/v1725502175/shirts/shirts.jpg')",
      flexBasis: { xs: "100%", sm: "30%" },
      linkUrl: "/shirts",
    },
    {
      id: "2",
      title: "Oversize",
      backgroundImage:
        "url('https://res.cloudinary.com/dnihs6uxl/image/upload/v1725502491/overize/oversize.jpg')",
      flexBasis: { xs: "100%", sm: "30%" },
      linkUrl: "/oversize",
    },
    {
      id: "3",
      title: "Accessories",
      backgroundImage:
        "url('https://res.cloudinary.com/dnihs6uxl/image/upload/v1725502342/accessories/accessories.jpg')",
      flexBasis: { xs: "100%", sm: "30%" },
      linkUrl: "/accessories",
    },
  ];

  const secondRowCategories = [
    {
      id: "4",
      title: "Women",
      backgroundImage:
        "url('https://res.cloudinary.com/dnihs6uxl/image/upload/v1724855603/cianotipia/cianwoman_vkoevj.jpg')",
      flexBasis: { xs: "100%", sm: "45%" },
      linkUrl: "/women",
    },
    {
      id: "5",
      title: "Men",
      backgroundImage:
        "url('https://res.cloudinary.com/dnihs6uxl/image/upload/v1724855574/cian_men_asgrqk.jpg')",
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
