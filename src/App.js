import React, { useEffect, useState } from "react";
import snapSoundEffect from "./assets/thanos_snap_sound.mp3";
import keyvalue from "./assets/keyvalue.png";
import close from "./assets/close.png";
import title from "./assets/Into_the_OpsVerse.png";
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
  const [showPopUp, setShowPopUp] = useState(false);
  const [teamId, setTeamId] = useState("");
  const [keyCode, setKeyCode] = useState("");
  const [response, setResponse] = useState("");
  const [leadingTeam, setLeadingTeam] = useState({});
  const [isBouncing, setIsBouncing] = useState(false);

  useEffect(() => {
    getData();
    const pollingInterval = setInterval(getData, 5000);
    return () => clearInterval(pollingInterval);
  }, []);

  useEffect(() => {
    if(leaderBoardData?.length > 0){
      setLeadingTeam(leaderBoardData[0])
    }
  }, [JSON.stringify(leaderBoardData)]);

  useEffect(() => {
    setIsBouncing(true);
     setTimeout(() => {
      setIsBouncing(false)
     }, 5000);
  }, [JSON.stringify(leadingTeam)]);

  const playSound = () => {
    if (snapSound) {
      snapSound?.play();
    }
  };

  const getData = () => {
    fetch("https://champion.opsverse.kvsandbox.link/pointstable")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLeaderBoardList(data);
      })
      .catch((error) => {
        console.log("error", error);
      });
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

  const getKeyCode = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ team_id: teamId, secret_code: keyCode }),
    };
    fetch(
      "https://champion.opsverse.kvsandbox.link/leaderboard",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => setResponse(data?.message || ''));
  };

  const openPopup = () => {
    setShowPopUp((prevShowPopUp) => !prevShowPopUp);
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

  const renderPopUp = () => {
    return (
      <div style={styles.popupBg}>
        <div
          style={
            response?.length > 0
              ? styles.popUpContainerLarge
              : styles.popUpContainer
          }
        >
          <div onClick={() => {setShowPopUp(false); setResponse('')}} style={styles.close}>
            <img style={styles.closeButton} src={close}  alt="Logo"/>
          </div>
          {response?.length > 0 ? (
            <div style={styles.responseText}>{response}</div>
          ) : (
            <>
              <div style={styles.popupTitle}>ADD KEYCODE</div>
              <input
                type="text"
                value={teamId}
                style={styles.inputText}
                placeholder="ENTER YOUR TEAM ID"
                onChange={(event) => {
                  setTeamId(event.target.value);
                }}
              />
              <input
                type="text"
                value={keyCode}
                style={styles.inputText}
                placeholder="ENTER YOUR KEYCODE"
                onChange={(event) => {
                  setKeyCode(event.target.value);
                }}
              />
              <button style={styles.submitButton} onClick={getKeyCode}>
                Submit
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      {showPopUp && renderPopUp()}
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
            <div  style={{height: '640px', overflow: 'hidden'}}>
              {leaderBoardData?.map((data, index) => {
                return (
                  <LeaderBoardCard
                    key={data?.team_id}
                    data={{ ...data, position: index }}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div style={styles.snapContainer}>
          <div className={isBouncing? 'bounce':''} onClick={playSound} style={styles.gImageContainer}>
            <img style={styles.image} src={getImageName()} alt="Logo" />
          </div>
          <div style={styles.winnerTextContainer}>
            {leaderBoardData?.length > 0 &&
            leaderBoardData[0]?.stage_curr === "6"
              ? `WOHOO!  ${leaderBoardData[0]?.team_id}  IS THE WINNER 🎉`
              : null}
          </div>
          <button onClick={openPopup} className="glow-on-hover">ADD KEYCODE</button>
        </div>
        <div style={styles.keyValueIcon} >
            <img style={styles.image} src={keyvalue} alt="Logo" />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100%",
    padding: "60px",
    fontFamily: "sans-serif",
    overflow: "hidden",
    position: "relative",
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
    borderRadius: "5px",
    background:
      "linear-gradient(130deg, rgba(255, 86, 246, 0.40) 18.31%, rgba(185, 54, 238, 0.40) 43.26%, rgba(59, 172, 226, 0.40) 85.44%, rgba(64, 106, 255, 0.40) 100%)",
    boxShadow: "0px 4px 97px 0px rgba(255, 86, 246, 0.51)",
    backdropFilter: "blur(96px)",
    color: "#FFF",
    border: '2px solid rgb(180,180,180)',
    height: "60px",
    marginBottom: '5px'
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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
    marginTop: "20px",
    height: "50px",
    textAlign: "center",
    marginBottom: "10px",
  },
  keyValueIcon: {
    position: "absolute",
    zIndex: 2,
    top: '30px',
    right: '20px',
    width: '160px',
  },
  popupBg: {
    position: "absolute",
    zIndex: 3,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(255,255,255,0.1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popUpContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "500px",
    height: "300px",
    borderRadius: "8px",
    backgroundColor: "#20083B",
    padding: "40px",
  },
  popUpContainerLarge: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    backgroundColor: "#20083B",
    color: '#FFF',
    padding: "20px",
    margin: '40px',
    maxWidth: '60%',
  },
  close: {
    position: "absolute",
    zIndex: 2,
    top: "10px",
    right: "10px",
  },
  popupTitle: {
    fontSize: '20px',
    fontWeight: '600',
    width: "400px",
    textAlign: 'left',
    color: '#FFF',
    marginBottom: '15px'
  },
  inputText: {
    width: "400px",
    height: "50px",
    backdropFilter: "blur(96px)",
    padding: "8px",
    border: "2px solid rgb(160,160,160)",
    borderRadius: "3px",
    marginBottom: "20px",
    fontSize: '14px',
    color: '#FFF',
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.00) 100%)',
  },
  submitButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "400px",
    height: "50px",
    fontWeight: '500',
    border: "0px solid rgb(120,120,120)",
    borderRadius: "6px",
    fontSize: '16px',
    textTransform: "uppercase",
    marginTop: "12px",
    cursor: 'pointer',
    color: '#FFF',
    background: "rgba(185, 54, 238, 0.40)",
  },
  closeButton: {
    width: '24px',
    height: '24px',
    cursor: 'pointer',
  },
  responseText: {
    paddingTop: '20px',
    padding: '10px'
  }
};

export default App;
