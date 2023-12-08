import { defineStore } from 'pinia'
import { getData, writeLyric, signIn } from "../helper/firebase.helper";
import { loadState } from '../helper/localStorage.helper'
import { toast } from 'vue3-toastify';

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
        toast.error('Error');
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
      }
      searchTerm = searchTerm.toLowerCase();
      const searchTermWithoutDiacritics = this.removeDiacritics(searchTerm);
      const that = this;
      let data = this.songsOriginal;
      this.songs = data.filter(song => {
        const songTitle1WithoutDiacritics = that.removeDiacritics(song.name1.toLowerCase());
        const songLyric = that.removeDiacritics(that.removeHTMLTag(song.lyric.toLowerCase()));
        let rs = songTitle1WithoutDiacritics.includes(searchTermWithoutDiacritics) || song.id.includes(searchTermWithoutDiacritics) || songLyric.includes(searchTermWithoutDiacritics);
        if (song.name2) {
          const songTitle2WithoutDiacritics = that.removeDiacritics(song.name2.toLowerCase());
          return rs || songTitle2WithoutDiacritics.includes(searchTermWithoutDiacritics)
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
      toast.success('Chỉnh sửa thành công.');
    },
    revertLyric() {
      this.song.lyric = this.songLyricOrigin
      toast.success('Đặt lại thành công.');
    }
  },
})
