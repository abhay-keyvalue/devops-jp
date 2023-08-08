import React, { useEffect, useState } from "react";
import snapSoundEffect from "./assets/thanos_snap_sound.mp3";
import title from "./assets/avengers_assemble.png";
import g1 from "./assets/g1.png";
import g2 from "./assets/g2.png";
import g3 from "./assets/g3.png";
import g4 from "./assets/g4.png";
import g5 from "./assets/g5.png";
import g6 from "./assets/g6.png";
import g0 from "./assets/g0.png";
import LeaderBoardCard from "./components/LeaderBoardCard";

import "./index.css";

const App = () => {
  const snapSound = new Audio(snapSoundEffect);

  const [leaderBoardData, setLeaderBoardList] = useState([]);

  useEffect(() => {
    getData();
    const pollingInterval = setInterval(getData, 5000);
    return () => clearInterval(pollingInterval);
  }, []);

  const playSound = () => {
    console.log("snapSound", snapSound);
    if (snapSound) {
      snapSound?.play();
    }
  };

  const getData = () => {
    fetch("https://champion.opsverse.kvsandbox.link/pointstable")
      .then((response) => {
        console.log("res", response);
        return response.json();
      })
      .then((data) => {
        console.log("data", data);
        setLeaderBoardList(data);
      });
  };

  const renderHeader = () => {
    return (
      <div style={styles.leaderBoardHeader}>
        <div style={styles.position}>
          <span>POS.</span>
        </div>
        <div style={styles.teamName}>
          <span>TEAM</span>
        </div>
        <div style={styles.gemTitle}>
          <span>Reality</span>
        </div>
        <div style={styles.gemTitle}>
          <span>Time</span>
        </div>
        <div style={styles.gemTitle}>
          <span>Power</span>
        </div>
        <div style={styles.gemTitle}>
          <span>Space</span>
        </div>
        <div style={styles.gemTitle}>
          <span>Mind</span>
        </div>
      </div>
    );
  };

  const getImageName = () => {
    if (leaderBoardData?.length > 0) {
      switch (leaderBoardData[0].stage_curr) {
        case "6":
          return g6;
        case "5":
          return g5;
        case "4":
          return g4;
        case "3":
          return g3;
        case "2":
          return g2;
        case "1":
          return g1;
        default:
          return g0;
      }
    }
    return g0;
  };

  return (
    <div style={styles.container}>
      <div style={styles.row}>
        <div style={styles.leaderBoardContainer}>
          <div style={styles.title}>
            <img style={styles.image} src={title} alt="Logo" />
          </div>
          <div style={styles.subTitle}>
            Unleash Infinite Power! Assemble your team and embark on an epic
            adventure!
          </div>
          <div style={styles.leaderBoard}>
            {renderHeader()}
            {leaderBoardData?.map((data, index) => {
              return <LeaderBoardCard data={{ ...data, position: index }} />;
            })}
          </div>
        </div>
        <div style={styles.snapContainer}>
          <div onClick={playSound} style={styles.gImageContainer} >
            <img style={styles.image} src={getImageName()} alt="Logo" />
          </div>
          <div style={styles.winnerTextContainer}>
          {(leaderBoardData?.length>0 && leaderBoardData[0]?.stage_curr === '6') ?`WOHOO!  ${leaderBoardData[0]?.team_id}  IS THE WINNER 🎉`: null}
          </div>
        </div>
        <br />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "99vh",
    width: "100%",
    padding: "60px",
    fontFamily: "sans-serif",
    overflow: "hidden",
  },
  title: {
    width: "480px",
    color: "#000",
    paddingLeft: "20px",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  subTitle: {
    color: "#FFF",
    fontSize: "16px",
    padding: "20px",
    fontWeight: 400,
  },
  row: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  leaderBoardContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "65%",
  },
  leaderBoard: {
    width: "900px",
  },
  leaderBoardHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "10px",
    margin: "20px",
    fontSize: "16px",
    background:
      "linear-gradient(130deg, rgba(255, 86, 246, 0.40) 18.31%, rgba(185, 54, 238, 0.40) 43.26%, rgba(59, 172, 226, 0.40) 85.44%, rgba(64, 106, 255, 0.40) 100%)",
    boxShadow: "0px 4px 97px 0px rgba(255, 86, 246, 0.51)",
    backdropFilter: "blur(96px)",
    color: "#FFF",
    border: "2px solid rgb(120,120,120)",
    height: "60px",
  },
  position: {
    width: "50px",
    color: "#FFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  teamName: {
    display: "flex",
    marginLeft: "20px",
    width: "300px",
    marginRight: "20px",
    color: "#FFF",
  },
  rating: {
    display: "flex",
    marginLeft: "20px",
  },
  gemTitle: {
    width: "80px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textTransform: "uppercase",
  },
  snapContainer: {
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: "100vh",
    padding: "20px",
    width: "35%",
    textTransform: "uppercase",
  },
  gImageContainer: {
    height: "60vh",
  },
  winnerTextContainer: {
    color: "#FFF",
    fontSize: "24px",
    fontWeight: 700,
    marginTop: '30px',
    height: '50px',
    marginBottom: '130px'
  }
};

export default App;
