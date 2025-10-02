import { getFirestore, collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";
import type { Resident } from './types';
import { db } from '@/firebase/config';

export async function getResidentByPhone(phone: string): Promise<Resident | undefined> {
    try {
        const residentsCol = collection(db, 'residents');
        const q = query(residentsCol, where("phone", "==", phone));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const residentDoc = querySnapshot.docs[0];
            return { id: residentDoc.id, ...residentDoc.data() } as Resident;
        }
        return undefined;
    } catch (error) {
        console.error("Error fetching resident by phone from Firestore: ", error);
        return undefined;
    }
}