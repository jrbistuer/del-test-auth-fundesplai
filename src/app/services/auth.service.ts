import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, UserCredential } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	constructor(private auth: Auth) {}

	async register({ email, password }: { email: string, password: string }) {
		try {
			const user = await createUserWithEmailAndPassword(this.auth, email, password);
			return user;
		} catch (e) {
			return null;
		}
	}

	async login({ email, password }: { email: string, password: string }) {
		try {
			const user: UserCredential = await signInWithEmailAndPassword(this.auth, email, password);
			console.log('user', user);
			const token = await user.user.getIdToken();
			console.log(token);			
			return user;
		} catch (e) {
			return null;
		}
	}

	logout() {
		getAuth().currentUser
		return signOut(this.auth);
	}
}