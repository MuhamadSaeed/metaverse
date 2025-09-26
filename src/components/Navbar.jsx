import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // the currentuser wll be null if no user legged in, onAuthStateChanged look if auth state changed:)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
    // clean the lis(mem leak problem)
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => alert("تم تسجيل الخروج")).catch((err) => console.log(err));
  };

  return (
    <nav className="w-full bg-gray-900 text-white flex justify-between items-center p-4 shadow-md">
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <button onClick={handleLogout}
              className="bg-white border-none text-[#73125C] sm:text-[18px] text-[10px] hover:text-[white] hover:bg-transparent px-4 py-1 rounded-lg font-bold transition-colors"
            >   تسجيل الخروج  </button>
            <Link to="/" className="text-white sm:text-[18px] text-[12px] hover:text-[#73125C] transition-colors">الرئيسية</Link>
            <Link to="/lessons/english" className="text-white sm:text-[18px] text-[12px] hover:text-[#73125C] transition-colors">الدروس</Link>
            <Link to="/ProfilePage" className="text-white sm:text-[18px] text-[12px] hover:text-[#73125C] transition-colors">الحساب</Link>
            {/* <Link to="/ai" className="text-white hover:text-[#73125C] transition-colors">استخدم الذكاء الاصطناعي</Link> */}
          </>
        ) : (
          <>
            <Link to="/login"
              className="bg-white text-[#73125C] sm:text-[18px] text-[10px] hover:text-[white] hover:bg-transparent px-4 py-1 rounded-lg font-bold transition-colors"
            > تسجيل الدخول  </Link>
            <Link to="/signup"
              className="bg-white text-[#73125C] sm:text-[18px] text-[10px] hover:text-[white] hover:bg-transparent px-4 py-1 rounded-lg font-bold transition-colors"
            >   انشاء حساب   </Link>
          </>
        )}
      </div>
      <div className="text-2xl font-bold text-white ">
        <Link to="/" className="text-white hover:text-[#73125C]">MetaVerse</Link>
      </div>
    </nav>
  );
};

export default Navbar;
