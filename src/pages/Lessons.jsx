import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const Lessons = () => {
  const { subject } = useParams();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

//   
  const subjectNames = {
    arabic: "العربية",
    english: "الإنجليزية",
    french: "الفرنسية",
    spanish: "الإسبانية",
    math: "الرياضيات",
    physics: "الفيزياء"
  };

  useEffect(() => {
    const fetchLessons = async () => {
      //loading till gets the data
      setLoading(true);
      // the coolection in fb is lessons
      const docRef = doc(db, "lessons", subject);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());        
        setLessons(docSnap.data().lessons || []);
      } else {
        setLessons([]);
      }

      setLoading(false);
    };
    // console.log(lessons);    
    fetchLessons();
  }, [subject]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-[#73125C] border-gray-200 rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="min-h-screen p-8 bg-white">
    <h1 className="text-4xl font-bold text-[#73125C] mb-8">{subjectNames[subject] || "المادة"}</h1>
    {lessons.length === 0 ? (<div className="text-center text-[#73125C] font-bold text-xl mt-20">لا توجد دروس لهذه المادة </div> )
    : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((_, index) => (
            <Link key={index} to={`/lesson/${subject}/lesson${index + 1}`}
              className="bg-[#73125C] text-white hover:text-white rounded-xl p-6 shadow-lg hover:bg-[#5c0e48] transition-colors flex items-center justify-center font-bold text-lg"
            >   درس {index + 1} </Link>
        ))}
        </div>
    )}
    </div>
  );
};

export default Lessons;
