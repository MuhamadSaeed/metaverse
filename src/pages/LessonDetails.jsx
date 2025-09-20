import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const LessonDetails = () => {
  const { subject, id } = useParams(); //id is the number of the lesson
  const [videoUrl, setVideoUrl] = useState(""); // video url 
  const [signUrl, setSignUrl] = useState(""); // sign video url(later)
  const [loading, setLoading] = useState(true);

  const subjectsMap = {
    arabic: "العربية",
    english: "الإنجليزية",
    french: "الفرنسية",
    spanish: "الإسبانية",
    math: "الرياضيات",
    physics: "الفيزياء",
  };

  useEffect(() => {
    const fetchLessonVideo = async () => {
      setLoading(true);
      // make a ref for doc
      const docRef = doc(db, "lessons", subject);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());        
        const lessons = docSnap.data().lessons || [];
        const lessonIndex = parseInt(id.replace("lesson", "")) - 1;

        let rawUrl = lessons[lessonIndex] || "";

        // we should turn the url to embeded
        let embedUrl = "";
        if (rawUrl.includes("youtu.be/")) {
          // we just get the url that after "youtu.be/" and rm the parameters ?
          const videoId = rawUrl.split("youtu.be/")[1].split("?")[0];
          embedUrl = `https://www.youtube.com/embed/${videoId}`;
        }
        setVideoUrl(embedUrl);
        setSignUrl(""); 
      } else {
        setVideoUrl("");
      }
      setLoading(false);
    };

    fetchLessonVideo();
  }, [subject, id]);


  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-[#73125C] border-gray-200 rounded-full animate-spin"></div>
      </div>
    );

  if (!videoUrl)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-[#73125C] font-bold text-xl">
        الفيديو غير متوفر
        <Link
          to={`/lessons/${subject}`}
          className="mt-4 text-white hover:text-white bg-[#73125C] px-6 py-3 rounded-lg hover:bg-[#5c0e48] transition-colors"
        > العودة للدروس
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-[#73125C] mb-8 text-center">
        {subjectsMap[subject]} - درس {id.replace("lesson", "")}
      </h1>

      {/* main vid + sign lang box */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* main vid */}
        <div className="aspect-video bg-gray-200 rounded-xl shadow-lg overflow-hidden">
          <iframe src={videoUrl} title={`lesson ${id}`} 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        {/* sign vid */}
        <div className="aspect-video bg-gray-100 rounded-xl shadow-lg flex items-center justify-center overflow-hidden">
          {signUrl ? (
            <iframe   src={signUrl} title={`sign language translation for lesson ${id}`}
              allow="accelerometer; autoplay; clipboard-write; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          ) : (
            <div className="text-center text-[#73125C] font-semibold p-4"> ترجمة بلغة الاشارة ستتوفر قريبا </div>
          )}
        </div>
      </div>

      <Link to={`/lessons/${subject}`}
        className="mt-6 text-white bg-[#73125C] hover:text-white px-6 py-3 rounded-lg hover:bg-[#5c0e48] transition-colors"
      >   العودة للدروس </Link>
    </div>
  );
};

export default LessonDetails;
