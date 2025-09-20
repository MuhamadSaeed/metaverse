import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      // if the email and pass are true, it return the cred object
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      //make a ref for the doc
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      // console.log(docSnap);

      // 
      if (!docSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName || "",
          email: user.email,
        });
      }

      console.log('logged in');
      navigate('/');
    } catch (firebaseError) {
      console.log(firebaseError.code);

      switch (firebaseError.code) {
        case 'auth/invalid-credential':
          setError('البريد الالكتروني او كلمة المرور غير صحيحة.');
          break;
        default:
          setError('حدث خطا ما. يرجى المحاولة مرة اخرى.');
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-white items-center justify-center p-4" dir="rtl">
      <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] bg-white p-8 shadow-lg rounded-xl border border-gray-200">
        <h1 className="text-3xl font-bold text-[#73125C] mb-8 text-center">تسجيل الدخول</h1>
        <form className="space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-100 border-r-4 border-red-500 text-red-700 p-4 rounded-lg" role="alert">
              <div className="flex items-center">
                <div className="mr-3">
                  <p className="font-bold">{error}</p>
                </div>
              </div>
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">البريد الالكتروني</label>
            <div className="mt-1">
              <input id="email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md "
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">  كلمة المرور</label>
            <div className="mt-1">
              <input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md"/>
            </div>
          </div>
          <div className="space-y-4">
            <button  type="submit"
              className="w-full flex justify-center py-2 px-4 border rounded-md text-sm text-white bg-[#73125C]"
            > تسجيل الدخول </button>
            <p className="mt-2 text-center text-sm text-gray-600">
              ليس لديك حساب؟ 
              <Link to="/signup" className="font-medium text-[#73125C] hover:text-[#73125C] ">  نشاء حساب جديد</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
