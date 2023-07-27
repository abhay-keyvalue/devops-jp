import React, { useEffect, useState } from "react";
import snapSoundEffect from "./assets/thanos_snap_sound.mp3";
import LeaderBoardCard from './components/LeaderBoardCard';

import "./index.css";

const leaderBoardList = [
  {
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    name: 'abhay',
    rating: 5,
  },
  {
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    name: 'balan',
    rating: 4,
  },
  {
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    name: 'jithesh',
    rating: 3,
  },
  {
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    name: 'raj',
    rating: 3,
  },
  {
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    name: 'jp',
    rating: 3,
  },
  {
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    name: 'abh',
    rating: 2,
  },
  {
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    name: 'manu',
    rating: 2,
  },
  {
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    name: 'wow',
    rating: 1,
  },
  {
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    name: 'qwerty',
    rating: 1,
  },
  {
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    name: 'asd',
    rating: 0,
  },
  {
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    name: 'zxc',
    rating: 0,
  },
];

const App = () => {
 const snapSound = new Audio(snapSoundEffect);

 const [leaderBoardData, setLeaderBoardList]= useState(leaderBoardList);

 useEffect(()=> {
   // getData();
 }, [])

 const playSound = ()=>{
  console.log('snapSound', snapSound);
      if(snapSound){
        snapSound?.play();
      }
    }

  const getData = ()=> {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log('data', data);
      setLeaderBoardList(data);
    })
  }

	return (
    <div style={styles.container}>
      <div style={styles.row}>
        <div style={styles.leaderBoardContainer}>
          <div style={styles.leaderBoard}>
          <div style={styles.title}>
            LEADERBOARD
          </div>
          {leaderBoardData?.map((data, index)=> {
            return(
                <LeaderBoardCard data={{...data, position: index}}  />
            )
          })
          }
            
          </div>
        </div>
        <div style={styles.snapContainer}>
          test
        </div>
        <br />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%'
  },
  title: {
    fontSize: '30px',
    fontFamily: 'sans-serif',
    fontWeight: 700,
    textAlign: 'center',
    width: '100%',
    paddingTop: 20,
    color: '#000',
  },
  row:{
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  leaderBoardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  snapContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    height: '100vh', 
    padding: '20px',
    width: '40%',
  },
  leaderBoard :{
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginLeft: 20,
    borderRadius: 10,
    width: '100%',
    height: '90vh', 
    overflow: 'scroll',
  }
}

export default App;
