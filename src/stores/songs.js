import { defineStore } from 'pinia'
import { getData, writeLyric, signIn } from "../helper/firebase.helper";
import { loadState } from '../helper/localStorage.helper'

export const useSongStore = defineStore('songs', {
  state: () => ({
      songsOriginal: [],
      song: null,
      songLyricOrigin: '',
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
          return state.favoriteIds.includes(song.id);
        });
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
        if (this.songs) {
          await this.fetchSongs();
        }
        let song = this.songs.find(song => song.id == songId);
        song.lyric = song.lyric.replace(/\\n/g, '<br>');
        this.song = song;
        this.songLyricOrigin = song.lyric;
        this.tab = 'back';
      } catch (error) {
        console.error('Error');
        document.location.href = '/'
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
        return;
      }
      searchTerm = searchTerm.toLowerCase();
      const searchTermWithoutDiacritics = this.removeDiacritics(searchTerm);
      const that = this;
      let data = JSON.parse(JSON.stringify(this.songsOriginal));
      this.songs = data.filter(song => {
        if (searchTerm.trim() == '') {
          return true;
        }
        const songTitle1WithoutDiacritics = that.removeDiacritics(song.name1.toLowerCase());
        const songLyric = that.removeDiacritics(that.removeHTMLTag(song.lyric.toLowerCase()));
        const resultInTitle1 = songTitle1WithoutDiacritics.includes(searchTermWithoutDiacritics);
        let rs = resultInTitle1 || song.id.includes(searchTermWithoutDiacritics) || songLyric.includes(searchTermWithoutDiacritics);
        let resultInTitle2 = false;
        if (song.name2) {
          const songTitle2WithoutDiacritics = that.removeDiacritics(song.name2.toLowerCase());
          resultInTitle2 = songTitle2WithoutDiacritics.includes(searchTermWithoutDiacritics)
          rs = rs || resultInTitle2
        }
        if (resultInTitle1 || resultInTitle2) {
          song.resultInTitle = true;
        } else {
          song.resultInTitle = false;
        }
        
        return rs;
      });
    },
    removeHTMLTag(str) {
      return str.normalize('NFD').replace(/<[^>]*>/g, '');
    },
    removeDiacritics(str) {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    },
    changeTab(tabName) {
      this.tab = tabName;
    },
    saveSong() {
      const songIdx = +this.song.id - 1;
      writeLyric(songIdx, this.song);
      this.songLyricOrigin = this.song.lyric;
      console.log('Chỉnh sửa thành công.');
    },
    revertLyric() {
      this.song.lyric = this.songLyricOrigin
      console.log('Đặt lại thành công.');
    }
  },
})
