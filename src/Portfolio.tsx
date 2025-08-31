import { useState} from 'react';
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  MessageCircleIcon,
} from 'lucide-react';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const projects = [
    {
      id: 1,
      name: "CourseIT LMS",
      category: "Full-Stack Development",
      image: "/LMS.png",
      description: "Full-Stack Deveopment of a Learning Management System with Django",
      link: "https://github.com/Nuelnyakyz/CourseIt.git"
    },
    {
      id: 1,
      name: "Students' Registration Portal",
      category: "Backend Development - API",
      image: "/Portal.png",
      description: "API Deveopment for a Students' Registration System with GoLang",
      link: "https://github.com/Nuelnyakyz/306-go-backend.git"
    },
    {
      id: 2,
      name: "Android Notes App",
      category: "Mobile Development - Kotlin",
      image: "/NotesApp.png",
      description: "Complete Notes App with Firestore integration and offline capabilities",
      link: "https://github.com/Nuelnyakyz/notesAppV2.git"
    },
    {
      id: 3,
      name: "AudioBook Generator",
      category: "Python & AI",
      image: "AudioBook.png",
      description: "Python-based audiobook generator using Deepgram's TTS API",
      link: "https://github.com/Nuelnyakyz/pdf_reader.git"
    }
  ];

  const skills = [
    { name: 'Python', icon: '🐍' },
    { name: 'Django', icon: '🎯' },
    { name: 'React', icon: '⚛️' },
    { name: 'Java', icon: '☕' },
    { name: 'Go', icon: '🚀' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'MySQL', icon: '🗄️' },
    { name: 'A.I', icon: '🤖' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  const nextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Custom CSS styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .galaxy-bg {
            background: linear-gradient(135deg, #000000 0%, #050505 20%, #0a0a0a 40%, #020202 60%, #000000 100%);
            position: relative;
            overflow: hidden;
          }
          
          .galaxy-bg::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
              radial-gradient(3px 3px at 25px 45px, rgba(255,255,255,0.9), transparent),
              radial-gradient(1px 1px at 85px 15px, rgba(255,255,255,0.7), transparent),
              radial-gradient(2px 2px at 150px 85px, rgba(255,255,255,0.8), transparent),
              radial-gradient(1px 1px at 220px 35px, rgba(255,255,255,0.6), transparent),
              radial-gradient(4px 4px at 180px 125px, rgba(255,255,255,1), transparent),
              radial-gradient(1px 1px at 50px 95px, rgba(255,255,255,0.5), transparent),
              radial-gradient(2px 2px at 300px 65px, rgba(255,255,255,0.7), transparent),
              radial-gradient(1px 1px at 120px 180px, rgba(255,255,255,0.6), transparent),
              radial-gradient(3px 3px at 280px 140px, rgba(255,255,255,0.9), transparent),
              radial-gradient(1px 1px at 90px 220px, rgba(255,255,255,0.4), transparent),
              radial-gradient(2px 2px at 350px 95px, rgba(255,255,255,0.8), transparent),
              radial-gradient(1px 1px at 40px 160px, rgba(255,255,255,0.5), transparent),
              radial-gradient(5px 5px at 200px 200px, rgba(255,255,255,1), transparent),
              radial-gradient(1px 1px at 320px 25px, rgba(255,255,255,0.6), transparent),
              radial-gradient(2px 2px at 80px 75px, rgba(255,255,255,0.7), transparent);
            background-repeat: repeat;
            background-size: 400px 250px, 300px 200px, 500px 300px, 350px 220px, 450px 280px;
            animation: 
              twinkle1 3s ease-in-out infinite alternate,
              drift 25s linear infinite;
          }
          
          .galaxy-bg::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
              radial-gradient(2px 2px at 70px 120px, rgba(255,255,255,0.8), transparent),
              radial-gradient(1px 1px at 190px 60px, rgba(255,255,255,0.4), transparent),
              radial-gradient(3px 3px at 130px 210px, rgba(255,255,255,0.9), transparent),
              radial-gradient(1px 1px at 260px 80px, rgba(255,255,255,0.5), transparent),
              radial-gradient(2px 2px at 160px 35px, rgba(255,255,255,0.7), transparent),
              radial-gradient(4px 4px at 310px 150px, rgba(255,255,255,1), transparent),
              radial-gradient(1px 1px at 100px 140px, rgba(255,255,255,0.6), transparent),
              radial-gradient(2px 2px at 240px 190px, rgba(255,255,255,0.8), transparent);
            background-repeat: repeat;
            background-size: 380px 230px, 420px 260px, 320px 180px;
            animation: 
              twinkle2 4s ease-in-out infinite alternate,
              drift-reverse 30s linear infinite;
          }
          
          .cloud-pattern {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
              radial-gradient(circle at 15% 25%, rgba(255,255,255,0.005) 0%, transparent 40%),
              radial-gradient(circle at 85% 75%, rgba(255,255,255,0.008) 0%, transparent 45%),
              radial-gradient(circle at 65% 35%, rgba(255,255,255,0.003) 0%, transparent 35%);
            background-size: 800px 800px, 1000px 1000px, 600px 600px;
            animation: float-clouds 35s ease-in-out infinite;
          }
          
          @keyframes twinkle1 {
            0% { opacity: 0.3; transform: scale(1); }
            25% { opacity: 1; transform: scale(1.2); }
            50% { opacity: 0.7; transform: scale(0.9); }
            75% { opacity: 0.9; transform: scale(1.1); }
            100% { opacity: 0.4; transform: scale(1); }
          }
          
          @keyframes twinkle2 {
            0% { opacity: 0.4; transform: scale(0.8); }
            30% { opacity: 0.8; transform: scale(1.3); }
            60% { opacity: 0.5; transform: scale(1); }
            80% { opacity: 1; transform: scale(1.1); }
            100% { opacity: 0.6; transform: scale(0.9); }
          }
          
          @keyframes drift {
            0% { transform: translateX(0) translateY(0); }
            25% { transform: translateX(10px) translateY(-5px); }
            50% { transform: translateX(-5px) translateY(8px); }
            75% { transform: translateX(8px) translateY(-3px); }
            100% { transform: translateX(0) translateY(0); }
          }
          
          @keyframes drift-reverse {
            0% { transform: translateX(0) translateY(0); }
            25% { transform: translateX(-8px) translateY(5px); }
            50% { transform: translateX(5px) translateY(-8px); }
            75% { transform: translateX(-10px) translateY(3px); }
            100% { transform: translateX(0) translateY(0); }
          }
          
          @keyframes float-clouds {
            0%, 100% { transform: translateX(0) translateY(0); }
            33% { transform: translateX(20px) translateY(-15px); }
            66% { transform: translateX(-15px) translateY(10px); }
          }
          
          .glass-card {
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.05);
          }
          
          .text-primary { color: #60A5FA; }
          .bg-primary { background-color: #3B82F6; }
          .border-primary { border-color: #3B82F6; }
          .hover\\:text-primary:hover { color: #60A5FA; }
          .hover\\:bg-primary:hover { background-color: #3B82F6; }
          .focus\\:border-primary:focus { border-color: #3B82F6; }
          
          .btn {
            @apply px-8 py-3 rounded-lg font-semibold transition-all duration-300 inline-block text-center;
          }
          
          .btn-primary {
            @apply bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5;
          }
          
          .btn-secondary {
            @apply border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5;
          }
          
          .float-animation {
            animation: float 6s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          .fade-in {
            animation: fadeIn 0.8s ease-in-out;
          }
          
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          
          .slide-in-left {
            animation: slideInLeft 0.8s ease-in-out;
          }
          
          @keyframes slideInLeft {
            0% { opacity: 0; transform: translateX(-50px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          
          .slide-in-right {
            animation: slideInRight 0.8s ease-in-out;
          }
          
          @keyframes slideInRight {
            0% { opacity: 0; transform: translateX(50px); }
            100% { opacity: 1; transform: translateX(0); }
          }
        `
      }} />

      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-black/98 backdrop-blur-sm shadow-lg z-50 transition-all duration-300 border-b border-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center py-4">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Mannu
          </div>
          
          <nav className="hidden md:flex">
            <ul className="flex space-x-16">
              {['about', 'projects', 'skills', 'contact'].map((section) => (
                <li key={section} className="">
                  <button 
                    onClick={() => scrollToSection(section)} 
                    className="text-gray-400 hover:text-blue-400 font-medium transition-colors capitalize relative group px-3"
                  >
                    {section}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          <button 
            className="md:hidden p-2 hover:bg-gray-900 rounded-lg transition-colors text-gray-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/98 border-t border-gray-900 backdrop-blur-sm">
            <ul className="flex flex-col space-y-4 p-5">
              {['about', 'projects', 'skills', 'contact'].map((section) => (
                <li key={section}>
                  <button 
                    onClick={() => scrollToSection(section)} 
                    className="text-gray-400 hover:text-blue-400 font-medium capitalize"
                  >
                    {section}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-20 galaxy-bg min-h-screen flex items-center relative">
        <div className="cloud-pattern"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
          <div className="flex flex-col items-center justify-center text-center">
            {/* Text Content */}
            <div className="slide-in-left max-w-4xl mb-8">

              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-white">
                Hi, I'm <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Mannu</span>
              </h1>
            </div>
            
            {/* Profile Image */}
            <div className="slide-in-right max-w-md mb-8">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                <img 
                  src="/profile.png" 
                  alt="Mannu - Backend Developer" 
                  className="relative w-100% h-100 mx-auto rounded-full shadow-2xl float-animation object-cover border-4 border-blue-400/30"
                />
              </div>
            </div>

            {/* Additional Text Content */}
            <div className="slide-in-left max-w-3xl text-center">
              <h2 className="text-2xl lg:text-4xl text-gray-200 mb-10 font-extrabold">
                Software Developer 
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-3xl mx-auto">
                I build robust backend systems, APIs, and scalable server-side applications. Passionate about creating efficient solutions that power modern web applications.
              </p>
              <div className="flex flex-row sm:flex-row gap-4 justify-center">
                <button onClick={() => scrollToSection('projects')} className="btn btn-primary">
                  View My Work
                </button>
                <button onClick={() => scrollToSection('contact')} className="btn btn-secondary">
                  Get In Touch
                </button>
              </div>
              
              {/* Social Links */}
              <div className="flex justify-center space-x-4 mt-8">
                <a href="https://github.com/Nuelnyakyz" className="p-3 glass-card rounded-full hover:bg-blue-500/20 hover:text-blue-400 transition-all duration-300 text-gray-500">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/emmanuel-nyabicha-411879239/" className="p-3 glass-card rounded-full hover:bg-blue-500/20 hover:text-blue-400 transition-all duration-300 text-gray-500">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="p-3 glass-card rounded-full hover:bg-blue-500/20 hover:text-blue-400 transition-all duration-300 text-gray-500">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-900 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-blue-400 font-semibold text-sm uppercase tracking-wide">About Me</span>
              <h2 className="text-3xl lg:text-3xl font-bold mt-2 mb-6 text-white">
                  Software Developer with <span className="text-blue-400">Backend</span> Expertise
              </h2>
              <div className="text-lg text-gray-400 mb-8 leading-relaxed max-w-3xl mx-auto">
                <p className="text-left">
                  I'm a passionate backend developer specializing in Python and Django. I build robust APIs, scalable backend systems, and have a growing expertise in machine learning and AI. I enjoy solving complex problems and creating efficient, maintainable code.
                </p><br/>
                <div className="text-left">
                  <p><b className="text-white font-bold">Languages:</b> Python, Java, Go, JavaScript/TypeScript</p>
                  <p><b className="text-white font-bold">Frameworks:</b> Django, React, Android (Kotlin/Java), Gin</p>
                  <p><b className="text-white font-bold">Databases:</b> PostgreSQL, MongoDB, Firebase, RoomDB</p>
                  <p><b className="text-white font-bold">Other Skills:</b> REST APIs, AI Integration, Cloud Deployments, TailwindCSS, Git, Problem Solving</p>
                </div>
              </div>
            </div>
            
            {/* Personal Details - Vertical Layout */}
            <div className="glass-card rounded-2xl p-8 mb-12">
              <h3 className="text-xl font-bold mb-6 text-center text-white">Personal Information</h3>
              <div className="max-w-md mx-auto space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-gray-800">
                  <span className="font-semibold text-gray-300">Name:</span>
                  <span className="text-gray-500">Emmanuel</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-800">
                  <span className="font-semibold text-gray-300">Email:</span>
                  <span className="text-gray-500">nuelmanu265@gmail.com</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-800">
                  <span className="font-semibold text-gray-300">Location:</span>
                  <span className="text-gray-500">Nairobi, Kenya</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-800">
                  <span className="font-semibold text-gray-300">Specialization:</span>
                  <span className="text-gray-500">Backend Development</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="font-semibold text-gray-300">Status:</span>
                  <span className="text-green-400 flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                    Available for Projects
                  </span>
                </div>
              </div>
            </div>

            {/* Memberships */}
            <div className="text-center mb-12">
              <h3 className="text-xl font-bold mb-6 text-white">Professional Memberships</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="glass-card p-6 rounded-xl hover:bg-black/30 transition-all duration-300 border border-gray-800">
                  <div className="w-36 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-4 p-2">
                    <img 
                      src="/IEEE.png" 
                      alt="IEEE Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-orange-400 font-semibold">IEEE Computer Society</div>
                  <div className="text-gray-400 text-sm">Kenyatta University Chapter</div>
                </div>
                <div className="glass-card p-6 rounded-xl hover:bg-black/30 transition-all duration-300 border border-gray-800">
                  <div className="w-36 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-4 p-2">
                    <img 
                      src="/AfricasTalking.png" 
                      alt="Africa's Talking Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-orange-400 font-semibold">Africa's Talking</div>
                  <div className="text-gray-400 text-sm">ML & AI Community</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Experience Timeline */}
          <div className="mt-24">
            <div className="text-center mb-16">
              <span className="text-blue-400 font-semibold text-sm uppercase tracking-wide">My Journey</span>
              <h3 className="text-3xl lg:text-4xl font-bold mt-2 mb-4 text-white">Experience & Education</h3>
              <p className="text-gray-400 text-lg">My professional growth and learning path</p>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 hidden md:block"></div>
                
                <div className="space-y-16">
                  <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8 fade-in">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white shadow-lg mx-auto md:mx-0">
                      <Briefcase size={24} />
                    </div>
                    <div className="glass-card p-8 rounded-xl flex-1 hover:bg-black/30 transition-all duration-300 border border-gray-800">
                      <h4 className="font-bold text-xl mb-1 text-white">Backend Developer</h4>
                      <p className="text-blue-400 font-semibold mb-2">Django & API Specialist</p>
                      <p className="text-gray-400 text-sm mb-4">2023 - Present</p>
                      <p className="text-gray-400 leading-relaxed">Developing scalable backend systems with Django, creating RESTful APIs, and implementing machine learning solutions. Experience with microservices architecture and database optimization.</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8 fade-in">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg mx-auto md:mx-0">
                      <Briefcase size={24} />
                    </div>
                    <div className="glass-card p-8 rounded-xl flex-1 hover:bg-black/30 transition-all duration-300 border border-gray-800">
                      <h4 className="font-bold text-xl mb-1 text-white">Full Stack Developer</h4>
                      <p className="text-purple-400 font-semibold mb-2">Python & React Integration</p>
                      <p className="text-gray-400 text-sm mb-4">2024 - Present</p>
                      <p className="text-gray-400 leading-relaxed">Built end-to-end web applications combining Python backends with React frontends. Focused on API development, database design, and system architecture.</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8 fade-in">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white shadow-lg mx-auto md:mx-0">
                      <GraduationCap size={24} />
                    </div>
                    <div className="glass-card p-8 rounded-xl flex-1 hover:bg-black/30 transition-all duration-300 border border-gray-800">
                      <h4 className="font-bold text-xl mb-1 text-white">BSc Computer Science</h4>
                      <p className="text-green-400 font-semibold mb-2">Kenyatta University</p>
                      <p className="text-gray-400 text-sm mb-4">2022 - Present</p>
                      <p className="text-gray-400 leading-relaxed">Focused on software engineering, algorithms, and database systems. Active member of IEEE Computer Society chapter. Strong foundation in programming languages and system design.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-black relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-400 font-semibold text-sm uppercase tracking-wide">Portfolio</span>
            <h2 className="text-3xl lg:text-4xl font-bold mt-2 mb-4 text-white">Featured Projects</h2>
            <p className="text-gray-400 text-lg">Backend systems and APIs I've built</p>
          </div>
          
          <div className="relative max-w-3xl mx-auto">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentProjectIndex * 100}%)` }}
              >
                {projects.map((project) => (
                  <div key={project.id} className="w-full flex-shrink-0 px-4">
                    <div className="glass-card rounded-2xl overflow-hidden hover:bg-gray-700/30 transition-all duration-500 transform hover:-translate-y-2 border border-gray-800">
                      <div className="relative overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.name} 
                          className="w-full h-80 object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                      <div className="p-8">
                        <div className="mb-3">
                          <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold">
                            {project.category}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-white">{project.name}</h3>
                        <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>
                        <div className="flex space-x-4">
                          <a href={project.link} className="text-blue-400 font-semibold hover:text-blue-300 transition-colors flex items-center">
                            View Project <ChevronRight size={16} className="ml-1" />
                          </a>
                          <a href={project.link} className="text-gray-500 hover:text-gray-400 transition-colors flex items-center">
                            <Github size={16} className="mr-1" /> Code
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center space-x-4 mt-8">
              <button 
                onClick={prevProject}
                className="w-12 h-12 glass-card border border-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-300 shadow-lg text-gray-400"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex space-x-2 items-center">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentProjectIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentProjectIndex ? 'bg-blue-500' : 'bg-gray-700'
                    }`}
                  />
                ))}
              </div>
              <button 
                onClick={nextProject}
                className="w-12 h-12 glass-card border border-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-300 shadow-lg text-gray-400"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-400 font-semibold text-sm uppercase tracking-wide">Skills</span>
            <h2 className="text-3xl lg:text-4xl font-bold mt-2 mb-4 text-white">Technologies I Work With</h2>
            <p className="text-gray-300 text-lg">Backend technologies, databases, and modern tools</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {skills.map((skill, index) => (
                <div key={index} className="group">
                  <div className="glass-card p-8 rounded-2xl text-center hover:bg-black/30 hover:-translate-y-3 transition-all duration-500 border border-gray-800 hover:border-blue-400/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative">
                      <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{skill.icon}</div>
                      <h3 className="font-bold text-lg text-gray-300 group-hover:text-blue-400 transition-colors duration-300">{skill.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-400 font-semibold text-sm uppercase tracking-wide">Contact</span>
            <h2 className="text-3xl lg:text-4xl font-bold mt-2 mb-4 text-white">
              Let's Work <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Together</span>
            </h2>
            <p className="text-gray-200 text-lg">Have a software project or API development need? Let's discuss!</p>
          </div>
          
          {/* Contact Cards */}
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="glass-card p-8 rounded-2xl text-center hover:bg-slate-800/30 hover:-translate-y-2 transition-all duration-500 group border border-gray-800">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Mail size={24} />
                </div>
                <h3 className="font-bold text-xl mb-3 text-white">Email Me</h3>
                <p className="text-gray-400 mb-4">nuelmanu265@gmail.com</p>
                <a href="mailto:nuelmanu265@gmail.com" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                  Send Message →
                </a>
              </div>
              
              <div className="glass-card p-8 rounded-2xl text-center hover:bg-slate-800/30 hover:-translate-y-2 transition-all duration-500 group border border-gray-800">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Phone size={24} />
                </div>
                <h3 className="font-bold text-xl mb-3 text-white">Call Me</h3>
                <p className="text-gray-400 mb-4">+254 714 346 619</p>
                <a href="tel:+254123456789" className="text-purple-400 font-semibold hover:text-purple-300 transition-colors">
                  Call Now →
                </a>
              </div>
              
              <div className="glass-card p-8 rounded-2xl text-center hover:bg-slate-800/30 hover:-translate-y-2 transition-all duration-500 group border border-gray-800">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <MessageCircleIcon size={24} />
                </div>
                <h3 className="font-bold text-xl mb-3 text-white">WhatsApp Me</h3>
                <p className="text-gray-400 mb-4">+254 714 346 619</p>
                <a href="#" className="text-green-400 font-semibold hover:text-green-300 transition-colors">
                  Text Me →
                </a>
              </div>
            </div>

            {/* Action Buttons - Side by Side */}
            <div className="text-center">
              <div className="flex flex-row sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <button onClick={() => scrollToSection('projects')} className="btn btn-primary flex-1">
                  View My Work
                </button>
                <button onClick={() => scrollToSection('contact')} className="btn btn-secondary flex-1">
                  Get In Touch
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
              Mannu
            </div>
            <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
              Backend Developer specializing in Python, Django, and API development. Reach out!
            </p>
            
            {/* Social Links */}
            <div className="flex justify-center space-x-6 mb-8">
              <a href="https://github.com/Nuelnyakyz" className="p-3 glass-card rounded-full hover:bg-blue-500/20 transition-all duration-300 hover:scale-110 text-gray-500 hover:text-blue-400">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/emmanuel-nyabicha-411879239/" className="p-3 glass-card rounded-full hover:bg-blue-500/20 transition-all duration-300 hover:scale-110 text-gray-500 hover:text-blue-400">
                <Linkedin size={20} />
              </a>
              <a href="#" className="p-3 glass-card rounded-full hover:bg-blue-500/20 transition-all duration-300 hover:scale-110 text-gray-500 hover:text-blue-400">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-3 glass-card rounded-full hover:bg-blue-500/20 transition-all duration-300 hover:scale-110 text-gray-500 hover:text-blue-400">
                <Instagram size={20} />
              </a>
            </div>
            
            <div className="border-t border-gray-900 pt-8">
              <p className="text-gray-600">
                © {new Date().getFullYear()} Mannu. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;