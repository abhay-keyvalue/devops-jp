import React from "react";

import Rating from "../Rating"

const LeaderBoardCard = (props) => {
  const {position, name, profileImage, rating} = props.data;
	return (
    <div style={styles.container}>
      <div style={styles.position}>
        {position}
      </div>
      <div style={styles.playerImage}>
        <img style={styles.image} src={profileImage} alt="Logo" />
      </div>
      <div style={styles.playerName}>
      {name}
      </div>
      <div style={styles.rating}>
        <Rating rating={rating} />
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
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: '10px',
    fontSize: '22px',
    color: '#000',
    textTransform: 'uppercase',
    fontFamily: 'sans-serif',
  },
  position: {
    marginLeft: '5px',
    width: '26px',
    textAlign: 'right'
  },
  playerImage: {
    width: '60px',
    height: '50px',
    borderRadius: '25px',
    overflow: 'hidden',
    marginLeft: '20px',
    backgroundColor: 'red'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  playerName: {
    display: 'flex',
    marginLeft: '20px',
    width: '330px'
  },
  rating: {
    display: 'flex',
    marginLeft: '20px',
  },

}

export default LeaderBoardCard;
