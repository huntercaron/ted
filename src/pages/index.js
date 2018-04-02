import React from 'react'
import Link from 'gatsby-link'
import firebase from 'firebase'

require("firebase/firestore");

class IndexPage extends React.Component {
  componentDidMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBYCnd-ausHvyuKcgUy-0I6VoGS23s0gJ0',
      authDomain: 'localhost',
      projectId: 'ted-data'
    });

    this.db = firebase.firestore();

    this.db.collection("ted").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
    });

  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

export default IndexPage
