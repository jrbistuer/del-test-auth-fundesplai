import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, UserCredential } from '@angular/fire/auth';
import { UserService } from './users.service';
import { IUser } from '../../model/user.model';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	constructor(private auth: Auth, private userService: UserService) {}

	async register({ email, password }: { email: string, password: string }) {
		try {
			const user = await createUserWithEmailAndPassword(this.auth, email, password);
			const newUser: IUser = {
				US_Id_Session: user.user.uid,
				US_Email: user.user.email || '',
				US_Nom: "",
				US_Cognoms: ""
			};
			const createUser = this.userService.createUser(newUser);
			await lastValueFrom(createUser);
			console.log('user created', newUser);		
			const token = await user.user.getIdToken();
			console.log('token', token);			
			sessionStorage.setItem('tokenId', token);
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
			sessionStorage.setItem('tokenId', token);
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

	getCurrentUser(): IUser | null {
		const user = getAuth().currentUser;
		if (user) {
			return {
				US_Id_Session: user.uid,
				US_Email: user.email || '',
				US_Nom: "",
				US_Cognoms: ""
			};
		}
		return null;
	}
}