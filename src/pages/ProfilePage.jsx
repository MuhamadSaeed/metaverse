import React from 'react';
import ProgressBar from '../components/ProgressBar';
import Achievements from '../components/Achievements';
import ContactInfo from '../components/ContactInfo';
import Settings from '../components/SystemSettings';
import "../App.css";

const ProfilePage = () => {
  return (
    <div className="ProfilePage">
  
      <div className="profile">
        {/* صورة المستخدم */}
        <div className="avatar">
          <img src="src\assets\Ellipse50.png" alt="صورة المستخدم" />
        </div>

        {/* الاسم والشارة */}
        <div className="name-badge">
          <h2>ندى رضا كامل عبد الرحمن</h2>
          <span className="badge">⭐️ طالبة متميزة</span>
        </div>

        {/* شريط التقدم، الإنجازات، معلومات الاتصال، الإعدادات */}

        <ProgressBar Progress={50} />
        <Achievements translations={10} firstTime={true} />
        <ContactInfo 
          email="nadoshahehal@gmail.com" 
          phone="+1023529153" 
        />
        <Settings />
      </div>
    </div>
  );
};

export default ProfilePage;
