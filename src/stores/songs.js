import { defineStore } from 'pinia'
import { getData, getItem } from "../helper/firebase.helper";
import { loadState } from '../helper/localStorage.helper'

export const useSongStore = defineStore('songs', {
  state: () => {
    return {
      song: null,
      songsOriginal: [],
      songs: [],
      songsNonDiacritics: [],
      favoriteIds: [],
      lang: 'vi',
      error: null
    }
  },
  getters: {
    getSongFavorite: (state) => {
      return () => state.songs.filter((song, idx) => state.favoriteIds.includes(idx))
    },
  },
  actions: {
    async fetchSongs() {
      this.songs = []
      try {
        let data = await getData();
        data = data.map((song, idx) => {
          return {
            ...song,
            isFavorite: this.favoriteIds.includes(idx),
          }
        })
        console.log(data)
        this.songs = data;
        this.songsOriginal = data;
      } catch (error) {
        console.error(error)
        this.error = error
      }
    },
    async fetchSongsFavorite() {
      this.songs = []
      try {
        let data = await getData();
        data = data.map((song, idx) => {
          return {
            ...song,
            isFavorite: this.favoriteIds.includes(idx)
          }
        })
        data = data.filter((song, idx) => this.favoriteIds.includes(idx));
        this.songs = data;
        this.songsOriginal = data;
      } catch (error) {
        console.error(error)
        this.error = error
      }
    },
    async fetchSong(songId) {
      this.song = null
      try {
        let song = await getItem(songId);
        song.lyric2 = song.lyric2.replace(/\\n/g, '<br>');
        song.lyric1 = song.lyric1.replace(/\\n/g, '<br>');
        this.song = song;
        console.log(song)
      } catch (error) {
        console.error(error)
        this.error = error
      }
    },
    async fetchFavoriteIds() {
      this.favoriteIds = loadState('favorite') ?? [];
      console.log(this.favoriteIds);
    },
    searchSong(searchTerm) {
      if (searchTerm.trim() == '') {
        this.songs = this.songsOriginal;
      }
      const searchTermWithoutDiacritics = this.removeDiacritics(searchTerm);
      const that = this;
      let data = this.songsOriginal;
      this.songs = data.filter(song => {
        const songTitle1WithoutDiacritics = that.removeDiacritics(song.name1.toLowerCase());
        const songTitle2WithoutDiacritics = that.removeDiacritics(song.name2.toLowerCase());
        return songTitle1WithoutDiacritics.includes(searchTermWithoutDiacritics) || songTitle2WithoutDiacritics.includes(searchTermWithoutDiacritics);
      });
    },
    removeDiacritics(str) {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
  },
})
