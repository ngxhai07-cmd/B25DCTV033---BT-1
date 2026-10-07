import { useState, useEffect } from 'react';
import './App.css';

// Dữ liệu kỹ năng, dự án đặt trong mảng
const achievements = [
  { id: 1, title: "GPA Học kì 1", detail: "3.4" },
  { id: 2, title: "Chứng chỉ ngoại ngữ", detail: "TOEIC 795" }
];

const contactInfo = [
  { id: 1, label: "Email", value: "hainx.b25tv033@stu.ptit.edu.vn", type: "email" },
  { id: 2, label: "Điện thoại", value: "0858103207", type: "tel" }
];

// Component Header
function Header({ name, studentId }) {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Chào buổi sáng, chúc bạn một ngày học tập hiệu quả!');
    else if (hour < 18) setGreeting('Chào buổi chiều, chúc bạn tiếp tục làm việc năng suất!');
    else setGreeting('Chào buổi tối, chúc bạn buổi tối an lành!');
  }, []);

  return (
    <header>
      <h3>{greeting}</h3>
      <h1>{name}</h1>
      <p>Mã sinh viên: {studentId}</p>
    </header>
  );
}

// Component Navigation
function Navigation() {
  return (
    <nav>
        <a href="#">Trang chủ</a>
        <a href="#">Giới thiệu</a>
        <a href="#">Học tập</a>
        <a href="#">Liên hệ</a>
    </nav>
  );
}

// Component Section dùng children
function Section({ title, children }) {
  return (
    <>
      <h3>{title}</h3>
      {children}
    </>
  );
}

// Component Footer
function Footer() {
    return (
        <footer>
            <p>&copy; 2026 - Thiết kế bởi Nguyễn Xuân Hải (B25DCTV033)</p>
        </footer>
    );
}

// Component chính
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={isDarkMode ? 'dark-mode' : ''} style={{ minHeight: '100vh', transition: 'background-color 0.3s, color 0.3s' }}>
      <Header name="Nguyễn Xuân Hải" studentId="B25DCTV033" />
      <Navigation />
      
      <main>
        <h2>Hồ sơ cá nhân</h2>
        <div className="info-section">
            <p><strong>Ngày sinh:</strong> 10/3/2007</p>
            <p><strong>Đơn vị học tập:</strong> Học viện Công nghệ Bưu Chính Viễn thông (PTIT)</p>
            <p><strong>Khóa học:</strong> Sinh viên năm hai</p>

            <Section title="Học vấn & Thành tích">
              <ul>
                {achievements.map((item) => (
                  <li key={item.id}><strong>{item.title}:</strong> {item.detail}</li>
                ))}
              </ul>
            </Section>

            <Section title="Thông tin liên hệ">
              <ul>
                {contactInfo.map(info => (
                    <li key={info.id}>
                        <strong>{info.label}:</strong>{' '}
                        {info.type === 'email' ? (
                            <a href={`mailto:${info.value}`}>{info.value}</a>
                        ) : (
                            <a href={`tel:${info.value}`}>{info.value}</a>
                        )}
                    </li>
                ))}
              </ul>
            </Section>
        </div>

        <div className="btn-container">
          <button id="toggle-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
            Đổi màu nền ({isDarkMode ? 'Chế độ sáng' : 'Chế độ tối'})
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
