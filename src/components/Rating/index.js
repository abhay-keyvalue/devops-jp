import React from "react";

import gem1 from "../../assets/gem1.png";
import gem2 from "../../assets/gem2.png";
import gem3 from "../../assets/gem3.png";
import gem4 from "../../assets/gem4.png";
import gem5 from "../../assets/gem5.png";
import gemDisabled from "../../assets/gemDisabled.png";

const Rating = (props) => {
  const { rating = 0 } = props;
  const stoneArray = [gem1, gem2, gem3, gem4, gem5];
  return (
    <div style={styles.container}>
      {stoneArray?.map((item, index) => {
        return (
          <div style={styles.gemContainer}>
            <img
              style={styles.image}
              src={rating > index ? item : gemDisabled}
              alt="Logo"
            />
          </div>
        );
      })}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: "30px",
    height: "30px",
  },
  gemContainer: {
    width: '80px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
};

export default Rating;
