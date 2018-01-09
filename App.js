/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Button,
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

const SoundPlayer = require('react-native-sound');
let song = null;
let songs = [
  {
    file: 'murloc.mp3',
    title: 'Murloc'
  },
  {
    file: 'gandalf_frodo.mp3',
    title: 'Gandalf Frodo'
  },
  {
    file: 'unacceptable.mp3',
    title: 'Unacceptable'
  }
];

export default class App extends Component<{}> {
  constructor() {
    super();
  }

  onPressPlay(songId) {
    if (song !== null) {
      song.stop();
      song.release();
      song = null;
    }
    song = new SoundPlayer(songs[songId].file, SoundPlayer.MAIN_BUNDLE, (error) => {
      if (error) {
        console.debug('Something went wrong on the init.');
      } else {
        song.play((success) => {
          if (!success) {
              console.debug('Something went wrong on the play.');
          }
        });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
      {songs.map((song, key) =>
        <Button
          key={key}
          onPress={this.onPressPlay.bind(this, key)}
          title={song.title}
        />
      )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 30
  },
});
