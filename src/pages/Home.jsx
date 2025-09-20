import React from "react";
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


  return (
    <div className="flex flex-col min-h-screen">
      {/* hero sec */}
      <header className="flex flex-col sm:flex-row h-screen">
        <div className="w-full sm:w-1/2 h-full flex flex-col bg-gradient-to-b from-black to-[#73125C] text-white">
          <div className="flex flex-1 flex-col justify-center px-8">
            <h1 className="sm:text-3xl font-bold mb-6 text-2xl "> مرحبا بك في منصه التعلم الشامل </h1>
            <h2 className="sm:text-4xl font-extrabold text-2xl mb-6">SenseVerse</h2>
            <p className="sm:text-lg mb-10 max-w-md leading-relaxed">
              منصه تعليمية متطوره مصممه خصيصا لتوفير تجربه تفاعليه ثلاثيه الابعاد مع دعم كامل
              لذوي الاحتياجات الخاصه
            </p>
            <button className="bg-white text-[#73125C] font-bold py-3 px-6 rounded-xl shadow-md hover:text-[white] hover:bg-transparent hover:border-white border-2 border-solid border-[#73125C]  transition-colors w-fit">
              جرب المترجم الفوري
            </button>
          </div>
        </div>
      {/*  */}
        <div className="hidden sm:block w-full sm:w-1/2">
          <img src={HomeSideImage}  alt="sv image" className="w-full h-full object-cover" />
        </div>
      </header>

      {/* lssns sec */}
      <section className="py-16 px-4 flex flex-col items-center bg-white">
        <h2 className="text-3xl font-bold mb-8 text-[#73125C]">الدروس</h2>
        
        <div className="flex flex-wrap gap-6 justify-center w-full">
          {lessons.map((lesson, index) => (
            <div key={index}
              className="bg-[#73125C] text-white rounded-xl p-6 flex-1 min-w-[200px] max-w-[300px] flex flex-col items-center justify-center shadow-lg"
            >
              <h3 className="text-xl font-bold mb-2">{lesson.name}</h3>
              <p className="text-center text-sm mb-4">{lesson.desc}</p>
              <Link to={lesson.link}
                className="bg-white text-[#73125C] font-bold py-2 px-6 rounded-lg shadow-md hover:text-[white] hover:bg-transparent hover:border-white border-2 border-solid border-[#73125C]  transition-colors"
              > ابدا الآن
              </Link>
            </div>
          ))}
        </div>
      </section>


      {/* trans sec */}
      <section className="bg-white text-black py-16 px-4 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-8 text-[#73125C]">الترجمه</h2>

        {/* text -> sign */}
        <div className="w-full max-w-3xl mb-16">
          <h3 className="text-2xl font-bold text-[#73125C] mb-6 text-center">ترجمه من النص الى لغة الاشارة</h3>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <input type="text" placeholder="اكتب هنا"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300"
            />
            <button className="bg-[#73125C] text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-[#5c0e48] transition-colors"> ترجم الان  </button>
          </div>
          <div className="bg-gray-100 text-black rounded-xl p-6 shadow-lg">
            <div className="w-full h-64 bg-gray-300 flex items-center justify-center rounded-lg">
              <img src={Hand} alt="tranlator output image" className="w-24 h-24 object-contain" />
            </div>
          </div>
        </div>

        {/* video -> text */}
        <div className="w-full max-w-3xl">
          <h3 className="text-2xl font-bold text-[#73125C] mb-6 text-center">ترجمه من الفيديو الى النص</h3>
          <div className="bg-gray-100 text-black rounded-xl p-6 shadow-lg">
            <div className="w-full h-64 bg-gray-300 flex flex-col items-center justify-center rounded-lg">
              <p className="text-gray-600 text-lg p-2 font-semibold mb-2">ميزة الترجمه من الكاميرا هتكون متاحة قريب</p>
              <button className="bg-[#73125C] text-white font-bold py-2 px-6 rounded-lg shadow-md opacity-60 cursor-not-allowed">
                فتح الكاميرا
              </button>
            </div>
          </div>
        </div>
      </section>



      {/* footerrrrrrrrrrrrrrrrr */}
      <footer className="bg-[#73125C] text-white py-6 mt-12 flex flex-col items-center">
        <p className="text-sm mb-2">©جميع الحقوق محفوظة.</p>
        <p className="text-sm mb-2">2025 SenseVerse</p>
        <div className="flex gap-4">
          <Link to="/" className="text-white hover:underline hover:text-[#999]">الرئيسية</Link>
          <Link to="/lessons/english" className="text-white hover:underline hover:text-[#999]">الدروس</Link>
          <Link to="/ai" className="text-white hover:underline hover:text-[#999]">الذكاء الاصطناعي</Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
