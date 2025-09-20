import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // async cuz firebase methods return promises
  const handleSignup = async (e) => {
    e.preventDefault();
    // error is null at the beggining anyway
    setError(null);
    try {
      //create the user
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      // console.log(userCredential);      
      const user = userCred.user; //

      //put the name
      await updateProfile(user, { displayName: name });

      // doc id is user.id
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        createdAt: serverTimestamp(),
      });

      console.log('signed up');
      navigate('/'); //go home after sign up
    } catch (firebaseError) {
      console.log(firebaseError.code);
      switch (firebaseError.code) {
        case 'auth/email-already-in-use':
          setError('ابريد الالكتروني هذا مستخدم بالفعل.');
          break;
        case 'auth/weak-password':
          setError('كلمة المرور يجب تكون 6 حروف على الاقل.');
          break;
        default:
          setError('يرجى المحاولة مرة اخرى.');
          console.error(firebaseError.message);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-white items-center justify-center p-4" dir="rtl">
      <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] bg-white p-8 shadow-lg rounded-xl border border-gray-200">
        <h1 className="text-3xl font-bold text-[#73125C] mb-8 text-center">انشاء حساب جديد</h1>
        <form className="space-y-6" onSubmit={handleSignup}>
          {error && (
            <div className="bg-red-100 border-r-4 border-red-500 text-red-700 p-4 rounded-lg">
              <p className="">{error}</p>
            </div>
          )}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">الاسم</label>
            <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">البريد الالكتروني</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">كلمة المرور</label>
            <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm"
            />
          </div>
          <button type="submit"
            className="w-full py-2 px-4 bg-[#73125C] text-white font-medium rounded-md"
          >
            انشاء حساب
          </button>
          <p className="mt-2 text-center text-sm text-gray-600">
            لديك حساب بالفعل؟{' '}
            <Link to="/login" className="font-medium text-[#73125C]">تسجيل الدخول</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
