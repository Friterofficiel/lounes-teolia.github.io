import React, { useEffect, useState } from 'react';
import { User, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [photoURL, setPhotoURL] = useState<string>(''); // Modification ici

  const updateProfileInfo = async () => {
    try {
      if (user) {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const profileUpdates: { displayName?: string | null; photoURL?: string | null } = {};
          
          if (displayName && displayName !== currentUser.displayName) {
            profileUpdates.displayName = displayName;
          }

          if (image) {
            const imageRef = ref(storage, `images/${user.uid}/${image.name}`);
            await uploadBytes(imageRef, image);
            const downloadURL = await getDownloadURL(imageRef);
            profileUpdates.photoURL = downloadURL;
            setImage(null);
            setPhotoURL(downloadURL); // Modification ici
          }

          await updateProfile(currentUser, profileUpdates);
          console.log('Profile updated successfully');

          setUser({
            ...currentUser,
            displayName: profileUpdates.displayName || currentUser.displayName
          });
          setErrorMessage('Profile updated successfully');
        } else {
          setErrorMessage('No user found');
        }
      } else {
        setErrorMessage('No user found');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage('Error updating profile');
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    })
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
      
      try {
        const imageRef = ref(storage, `images/${user?.uid}/${selectedImage.name}`);
        await uploadBytes(imageRef, selectedImage);
        const downloadURL = await getDownloadURL(imageRef);
        setPhotoURL(downloadURL); // Modification ici
      } catch (error) {
        console.error('Error uploading image:', error);
        setErrorMessage('Error uploading image');
      }
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center px-4 py-4 bg-gray-100">
      <div className="bg-white rounded-lg shadow-xl p-6">
        <div className="mb-8">
          <h1 className="text-3xl text-center font-bold mb-4 text-yellow-600">Profil de {user?.displayName || 'Utilisateur'}</h1>
          <div className="flex items-center mb-8">
          {user && (
              <img src={user?.photoURL || 'placeholder.jpg'} alt="Photo de profil" className=" h-16 w-16 rounded-full mr-4 border-2 border-yellow-600" />
            )}
            <div>
              <p className="font-bold text-lg">{user?.displayName || 'Nom inconnu'}</p>
              <p className="text-gray-500">{user?.email || 'Email inconnu'}</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4 text-yellow-600">Modifier le profil</h2>
          <input
            type="file"
            onChange={handleImageChange}
            className="mb-4"
          />
          {photoURL && <img src={photoURL} alt="Preview" className="mb-4 rounded-lg max-h-40" />} {/* Utilisez photoURL ici */}
          <input
            type="text"
            value={displayName}
            placeholder='Name'
            onChange={(e) => setDisplayName(e.target.value)}
            className="p-2 w-full border border-gray-300 rounded mb-4"
          />
          <button onClick={updateProfileInfo} className="bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-500 mb-4">Sauvegarder les modifications</button>
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
