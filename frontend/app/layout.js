import "./globals.css";
import NavBar from "../components/NavBar";

export const metadata = {
  title: "Stadium OS | Digital Twin",
  description: "AI-powered real-time digital twin platform for stadium crowd dynamics",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="main-layout" style={{ display: 'flex' }}>
          <NavBar />
          <div style={{ width: '100%', height: '100%', position: 'relative', flex: 1 }}>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
