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

    this.db.collection("ted").where("index", "==", 1).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        console.log(doc);
      });
    });

    // var tedRef = this.db.collection("ted");

    // let query = tedRef
    // console.log(query);
    

  }

  render() {
    return (
      <div>

      </div>
    )
  }
}

export default IndexPage
