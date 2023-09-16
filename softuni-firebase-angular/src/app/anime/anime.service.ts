import { Injectable } from '@angular/core';
import { collection, deleteDoc, doc, Firestore, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
import { AnimeData, FormattedAnime } from '../api/interfaces/anime';
import { BrowserStorageService } from '../storage.service';
import { MyList } from './types'
@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  uid = this.localStorageService.get('uid');

  constructor(private firestore: Firestore, private localStorageService: BrowserStorageService) {}

  formatAnime(anime: AnimeData): FormattedAnime {
    return {
      mal_id: anime.mal_id,
      title: anime.title || 'N/A',
      episodes: anime.episodes || 'N/A',
      aired: anime.aired?.string || 'N/A',
      synopsis: anime.synopsis || 'N/A',
      score: anime.score || 'N/A',
      members: anime.members || 'N/A',
      studios: anime.studios?.[0]?.name || 'N/A',
      source: anime.source || 'N/A',
      genres: anime.genres || 'N/A',
      image: anime.images?.webp?.large_image_url || 'N/A'
    } as FormattedAnime
  }

  async isAnimeInList(animeId: number, list: MyList): Promise<boolean> {
    const userDocRef = doc(this.firestore, 'users', this.uid);
    const likedAnimeDocRef = doc(userDocRef, list, animeId.toString());
    const snapshot = await getDoc(likedAnimeDocRef);
    return snapshot.exists();
  }

  async toggleInList(anime: FormattedAnime, list: MyList): Promise<void> {
    const isInList = await this.isAnimeInList(anime.mal_id, list);
    const userDocRef = doc(this.firestore, 'users', this.uid);
    const animeDocRef = doc(userDocRef, list, anime.mal_id.toString());
    
    if (isInList) {
      return await deleteDoc(animeDocRef);
    }
    await setDoc(animeDocRef, anime);
  }

  async getAllAnimeInList(list: MyList): Promise<FormattedAnime[]> {
    const userDocRef = doc(this.firestore, 'users', this.uid);
    const animeInListSnapshot = await getDocs(collection(userDocRef, list));
    return animeInListSnapshot.docs.map(doc => doc.data() as FormattedAnime);
  }
 
}
