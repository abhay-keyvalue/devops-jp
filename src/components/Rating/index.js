import React from "react";

import gem from '../../assets/gem.png';

const Rating = (props) => {
  const {rating = 3} = props;
  const stoneArray = [
    gem,gem,gem,gem,gem
  ]
	return (
    <div style={styles.container}>
      {stoneArray?.map((item, index) => {
        if(rating >= index){
          return( <img style={styles.image} src={item} alt="Logo" />)
        }
        return( <img style={styles.imageFade} src={item} alt="Logo" />)
      })}

    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: '50px',
    height: '50px',
    marginRight: '20px'
  },
  imageFade : {
    width: '50px',
    height: '50px',
    marginRight: '20px',
    opacity: 0.4
  }
}

export default Rating;
