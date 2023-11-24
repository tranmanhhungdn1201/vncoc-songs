import { defineStore } from 'pinia'
import { getData, getItem } from "../helper/firebase.helper";
import { loadState } from '../helper/localStorage.helper'

export const useSongStore = defineStore('songs', {
  state: () => ({
      songsOriginal: [],
      songs: [],
      tab: 'normal',
      loading: false,
      favoriteIds: [],
      lang: 'vi',
      error: null
  }),
  getters: {
    listSong: (state) => {
      if (state.tab === 'favorite') {
        if (!state.favoriteIds) {
          return state.songs;
        }
        const filter = state.songs.filter(song => {
          console.log(song.id, state.favoriteIds);
          return state.favoriteIds.includes(song.id);
        });
        console.log(123, filter)
        return filter;
      } else {
        return state.songs;
      }
    },
  },
  actions: {
    async fetchSongs() {
      this.songs = []
      this.loading = true;
      try {
        let data = await getData();
        data = data.map(song => {
          return {
            ...song,
            isFavorite: this.favoriteIds.includes(song.id),
          }
        })
        this.songs = data;
        this.songsOriginal = data;
      } catch (error) {
        console.error(error)
        this.error = error
      }
      this.loading = false;
    },
    async fetchSongsFavorite() {
      this.songs = []
      this.loading = true;
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
      this.loading = false;
    },
    async fetchSong(songId) {
      this.loading = true;
      this.song = null
      try {
        let song = this.songs.find(song => song.id == songId);
        song.lyric = song.lyric.replace(/\\n/g, '<br>');
        this.song = song;
      } catch (error) {
        console.error(error)
        this.error = error
      }
      this.loading = false;
    },
    async fetchFavoriteIds() {
      this.favoriteIds = loadState('favorite') ?? [];
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
        let rs = songTitle1WithoutDiacritics.includes(searchTermWithoutDiacritics) || song.id.includes(searchTermWithoutDiacritics);
        if (song.name2) {
          const songTitle2WithoutDiacritics = that.removeDiacritics(song.name2.toLowerCase());
          return rs || songTitle2WithoutDiacritics.includes(searchTermWithoutDiacritics)
        }
        return rs;
      });
    },
    removeDiacritics(str) {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    },
    changeTab(tabName) {
      this.tab = tabName;
    }
  },
})
