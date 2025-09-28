import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import HomeSideImage from "../assets/home-side.png";
import Hand from "../assets/hand.png";

const Home = () => {
const lessons = [
  {
    name: "العربيه",
    desc: "ابدا تعلم العربيه لتتقن اساسيات اللغة وقواعدها وتطور مهاراتك في القراءة والكتابة والمحادثة",
    link: "/lessons/arabic"
  },
  {
    name: "الانجليزيه",
    desc: "ابدا تعلم الانجليزيه لتتقن القراءة والكتابة والمحادثة بطريقة ممتعة وسهلة",
    link: "/lessons/english"
  },
  {
    name: "الفرنسيه",
    desc: "ابدا تعلم الفرنسيه لاكتساب اساسيات اللغة وممارسة المفردات والجمل الشائعة بسهولة",
    link: "/lessons/french"
  },
  {
    name: "الاسبانيه",
    desc: "ابدا تعلم الاسبانيه لتتمكن من التعبير والقراءة والكتابة بطريقة مبسطة وممتعة",
    link: "/lessons/spanish"
  },
  {
    name: "الرياضيات",
    desc: "ابدا تعلم الرياضيات لفهم المفاهيم الاساسية وحل المسائل بطريقة عملية وواضحة",
    link: "/lessons/math"
  },
  {
    name: "الفيزياء",
    desc: "ابدا تعلم الفيزياء لاكتشاف اساسيات الحركة والطاقة والقوانين المهمة بطريقة ممتعة وسهلة",
    link: "/lessons/physics"
  }
];

  //========== uploud section
  // the vid that the user chose it from the device
  const [uploadVideoFile, setUploadVideoFile] = useState(null);
  // the preview of the vid that the user coose it from his device
  const [uploadVideoPreview, setUploadVideoPreview] = useState(null);
  // the result of the api after sending to api
  const [uploadTranslation, setUploadTranslation] = useState("");

  //============ camer section
  // the video that the user streemed it 
  const [cameraVideoFile, setCameraVideoFile] = useState(null);
  // the preview of the stremed video
  const [cameraVideoPreview, setCameraVideoPreview] = useState(null);
  // the translation after sending the camera(stremed vido) 
  const [cameraTranslation, setCameraTranslation] = useState("");
  // is the user recording or no?
  const [recording, setRecording] = useState(false);
  // contains the live preview of the stremed vid
  const [cameraStream, setCameraStream] = useState(null);
  // to control the stop/open
  const mediaRecorderRef = useRef(null);
  // vid chuncks
  const recordedChunksRef = useRef([]);

  // ===== uPLOAD HANDLERS 
  const handleUploadVideoChange = (e) => {
    const file = e.target.files[0]; // the vid
    setUploadVideoFile(file);
    // trns the cideo to url so we can use it .. tmp url
    setUploadVideoPreview(URL.createObjectURL(file));
  };

  const handleUploadTranslateVideo = async () => {
    if (!uploadVideoFile) return alert("اختر فيديو اولا");
    // make a form data and send the video, the api accept "vedio"
    const formData = new FormData();
    formData.append("video", uploadVideoFile);

    try {
      const res = await fetch("http://127.0.0.1:5000/predict",
        { method: "POST", body: formData }
      );
      if (!res.ok) throw new Error("خطا في الاتصال");
      const data = await res.json();
      // console.log(data.translation)
      setUploadTranslation(data.translation);
    } catch (err) {
      console.error(err);
      alert("حدث خطا اثناء الترجمة");
    }
  };

  // ===== CAMERA HANDLERS 
  const startCamera = async () => {
    try {
      // const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      //ask for opining the cam and get the stremed video
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
      setRecording(true); // just for handling the stop annd open btns
      // MediaRecorder screens chuncks vids not one 
      recordedChunksRef.current = [];
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: "video/webm" });

      // get the chucnk, push it in the array(recordedChunksRef.current)
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) recordedChunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        // make the chcunks to one video
        const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
        // trns the blob to normal file
        const file = new File([blob], "camera_video.webm", { type: "video/webm" });
        setCameraVideoFile(file);
        setCameraVideoPreview(URL.createObjectURL(file));

        // stop camera stream
        stream.getTracks().forEach(track => track.stop());
        setCameraStream(null);
        setRecording(false);
      };
      // 
      mediaRecorderRef.current.start();
    } catch (err) {
      console.error(err);
      alert("لم نستطع الوصول للكاميرا");
    }
  };

  // stop the cam =>  should be there chucnks and recording is true
  const stopCamera = () => {
    if (mediaRecorderRef.current && recording) mediaRecorderRef.current.stop();
  };

  const handleSendCameraVideo = async () => {
    if (!cameraVideoFile) return alert("لا يوجد فيديو للارسال");

    const formData = new FormData();
    formData.append("video", cameraVideoFile);

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", { method: "POST", body: formData });
      if (!res.ok) throw new Error("خطا في الاتصال");
      const data = await res.json();
      setCameraTranslation(data.translation);
    } catch (err) {
      console.error(err);
      alert("حدث خطا اثناء الترجمة");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* hero sec */}
      <header className="flex flex-col sm:flex-row h-screen">
        <div className="w-full sm:w-1/2 h-full flex flex-col bg-gradient-to-b from-black to-[#73125C] text-white">
          <div className="flex flex-1 flex-col justify-center px-8">
            <h1 className="sm:text-3xl font-bold mb-6 text-2xl">مرحبا بك في منصه التعلم الشامل</h1>
            <h2 className="sm:text-4xl font-extrabold text-2xl mb-6">SenseVerse</h2>
            <p className="sm:text-lg mb-10 max-w-md leading-relaxed">
              منصه تعليمية متطوره مصممه خصيصا لتوفير تجربه تفاعليه ثلاثيه الابعاد مع دعم كامل لذوي الاحتياجات الخاصه
            </p>
            
            <a href="#trans" className="bg-white text-[#73125C] font-bold py-3 px-6 rounded-xl shadow-md hover:text-[white] hover:bg-transparent hover:border-white border-2 border-solid border-[#73125C]  transition-colors w-fit">
              جرب المترجم الفوري
            </a>

          </div>
        </div>
        <div className="hidden sm:block w-full sm:w-1/2">
          <img src={HomeSideImage} alt="sv image" className="w-full h-full object-cover" />
        </div>
      </header>

      {/* lssns sec */}
      <section className="py-16 px-4 flex flex-col items-center bg-white p-2">
        <h2 className="text-3xl font-bold mb-8 text-[#73125C]">الدروس</h2>
        <div className="flex flex-wrap gap-6 justify-center w-full">
          {lessons.map((lesson, index) => (
            <div key={index} className="bg-[#73125C] text-white rounded-xl p-6 flex-1 min-w-[200px] max-w-[300px] flex flex-col items-center justify-center shadow-lg">
              <h3 className="text-xl font-bold mb-2">{lesson.name}</h3>
              <p className="text-center text-sm mb-4">{lesson.desc}</p>
              <Link to={lesson.link} className="bg-white text-[#73125C] font-bold py-2 px-6 rounded-lg shadow-md hover:text-[white] hover:bg-transparent hover:border-white border-2 border-solid border-[#73125C]  transition-colors">
                ابدا الآن
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* text -> sign */}
      <section id="trans" className="w-full max-w-3xl mx-auto mb-16 mt-6">
        <h3 className="text-2xl font-bold text-[#73125C] mb-6 text-center">ترجمه من النص الى لغة الاشارة</h3>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input type="text" placeholder="اكتب هنا" className="flex-1 px-4 py-3 rounded-lg border border-gray-300" />
          <button className="bg-[#73125C] text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-[#5c0e48] transition-colors"> ترجم الان </button>
        </div>
        <div className="bg-gray-100 text-black rounded-xl p-6 shadow-lg">
          <div className="w-full h-64 bg-gray-300 flex items-center justify-center rounded-lg">
            <img src={Hand} alt="translator output" className="w-24 h-24 object-contain" />
          </div>
        </div>
      </section>

      {/* video upload sec */}
      <section className="w-full max-w-3xl mx-auto mb-16 bg-gray-50 p-6 rounded-xl shadow-lg flex flex-col items-center gap-4">
      <h3 className="text-2xl font-bold text-[#73125C] mb-4 text-center">
        ارفع فيديو لترجمته إلى نص هنا
      </h3>
        <input type="file" accept="video/*" onChange={handleUploadVideoChange} />
        {uploadVideoPreview && <video src={uploadVideoPreview} controls className="w-full max-w-md rounded-lg shadow-md mt-2" />}
        <button onClick={handleUploadTranslateVideo} className="bg-[#73125C] text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-[#5c0e48] transition-colors mt-2">
          ترجم الفيديو
        </button>
        {uploadTranslation && <div className="mt-4 p-4 bg-white rounded-lg shadow-md w-full text-center"><p className="text-lg font-semibold">{uploadTranslation}</p></div>}
      </section>

      {/* cam rec sec */}
      <section className="w-full max-w-3xl mx-auto mb-16 bg-gray-50 p-6 rounded-xl shadow-lg flex flex-col items-center gap-4">
        <h3 className="text-2xl font-bold text-[#73125C] mb-4 text-center">تسجيل فيديو بالكاميرا لترجمته</h3>

        {recording && cameraStream && (
          <video className="w-full max-w-md rounded-lg shadow-md" autoPlay muted ref={v => { if(v) v.srcObject = cameraStream; }} />
        )}

        {!recording ? (
          <button onClick={startCamera} className="bg-[#73125C] text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-[#5c0e48] transition-colors">
            فتح الكاميرا وتسجيل فيديو
          </button>
        ) : (
          <button onClick={stopCamera} className="bg-red-600 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-red-700 transition-colors">
            إيقاف التسجيل
          </button>
        )}

        {!recording && cameraVideoPreview && (
          <div className="flex flex-col items-center mt-2">
            <video src={cameraVideoPreview} controls className="w-full max-w-md rounded-lg shadow-md" />
            <button 
              onClick={handleSendCameraVideo} 
              className="mt-2 bg-[#73125C] text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-[#5c0e48] transition-colors"
            >
              أرسل الفيديو
            </button>
          </div>
        )}

        {cameraTranslation && <div className="mt-4 p-4 bg-white rounded-lg shadow-md w-full text-center"><p className="text-lg font-semibold">{cameraTranslation}</p></div>}
      </section>

    {/* footerrrrrrrrrrrrrrrrr */}
      <footer className="bg-[#73125C] text-white py-6 mt-12 flex flex-col items-center">
        <p className="text-sm mb-2">©جميع الحقوق محفوظة.</p>
        <p className="text-sm mb-2">2025 SenseVerse</p>
        <div className="flex gap-4">
          <Link to="/" className="text-white hover:underline hover:text-[#999]">الرئيسية</Link>
          <Link to="/lessons/english" className="text-white hover:underline hover:text-[#999]">الدروس</Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
