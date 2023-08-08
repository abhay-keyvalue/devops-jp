import React from "react";

import Rating from "../Rating"

const LeaderBoardCard = (props) => {
  const {position, team_id, stage_curr} = props.data;
	return (
    <div style={styles.container}>
      <div style={styles.position}>
        {position + 1}
      </div>
      <div style={styles.playerName}>
      {team_id}
      </div>
      <div style={styles.rating}>
        <Rating rating={Number(stage_curr)} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '10px',
    margin: '20px',
    borderRadius: '2px',
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.00) 100%)',
    backdropFilter: 'blur(50.5)',
    fontSize: '16px',
    color: '#FFF',
    fontFamily: 'sans-serif',
    border: '2px solid rgb(120,120,120)',
    height: '70px',
    overflow: 'hidden'
  },
  position: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50px',
    color: '#FFF',
  },
  playerName: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '20px',
    width: '300px',
    fontSize: '18px',
    color: '#FFF',
  },
  rating: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '20px',
  },
}

export default LeaderBoardCard;
