import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "del-test-react", appId: "1:681008159334:web:7b4cb542ac18cfe17feba7", storageBucket: "del-test-react.firebasestorage.app", apiKey: "AIzaSyCHAdFc5DZtuMfXNp8oDuooG-4zFS6YbV4", authDomain: "del-test-react.firebaseapp.com", messagingSenderId: "681008159334", measurementId: "G-X1PSNPRKL4" })), provideAuth(() => getAuth()), provideDatabase(() => getDatabase()), provideStorage(() => getStorage())]
};
