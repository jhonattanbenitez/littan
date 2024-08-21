
const categoryStyles = {
  categoryContainer: {
    minWidth: "30%",
    height: "240px",
    flex: "1 1 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid black",
    margin: "0 7.5px 15px",
    overflow: "hidden",
    position: "relative",

    "&:hover": {
      cursor: "pointer",

      "& .backgroundImage": {
        transform: "scale(1.1)",
        transition: "transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95)",
      },

      "& .categoryBodyContainer": {
        opacity: 0.9,
      },
    },

    "&.large": {
      height: "380px",
    },

    "&:first-of-type": {
      marginRight: "7.5px",
    },

    "&:last-of-type": {
      marginLeft: "7.5px",
    },
  },

  backgroundImage: {
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  categoryBodyContainer: {
    height: "90px",
    padding: "0 25px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid black",
    backgroundColor: "white",
    opacity: 0.7,
    position: "absolute",

    h2: {
      fontWeight: "bold",
      margin: "0 6px 0",
      fontSize: "22px",
      color: "#4a4a4a",
    },

    p: {
      fontWeight: "lighter",
      fontSize: "16px",
    },
  },
};

export default categoryStyles;
