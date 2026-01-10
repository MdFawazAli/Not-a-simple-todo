import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaChevronDown } from "react-icons/fa"; // Add at the top if not already imported
import ReactLogo from '../assets/React-logo.png';
import NodeLogo from '../assets/Nodejs-logo.png';
import MongoLogo from '../assets/MongoDB-logo.png';
import ExpressLogo from '../assets/Express-logo.png';

function About() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const sectionsRef = useRef([]);
  const techImgRefs = useRef([]); // <-- Add this line

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate hero title in
    const chars = titleRef.current ? titleRef.current.querySelectorAll("span") : [];
    gsap.fromTo(
      chars,
      {
        y: "120%",
        opacity: 0,
        filter: "blur(16px)",
        color: "#a78bfa",
      },
      {
        y: "0%",
        opacity: 1,
        filter: "blur(0px)",
        color: "#f472b6",
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.045,
        onComplete: () => {
          // Animate color wave
          chars.forEach((char, i) => {
            gsap.to(char, {
              color: "#60a5fa",
              repeat: -1,
              yoyo: true,
              duration: 1.2,
              ease: "power1.inOut",
              delay: i * 0.08,
            });
            gsap.to(char, {
              color: "#f472b6",
              repeat: -1,
              yoyo: true,
              duration: 1.2,
              ease: "power1.inOut",
              delay: 0.6 + i * 0.08,
            });
          });
        }
      }
    );

    // Animate subtitle in after title
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0, filter: "blur(8px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out", delay: 1.2 }
      );
    }

    // Animate each section in with a zoom/fade/blur effect
   sectionsRef.current.forEach((section, i) => {
      gsap.fromTo(
        section,
        {
          y: 80,
          opacity: 0,
          scale: 0.92,
          filter: "blur(12px)",
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play none none reverse",
            once: false,
          },
          delay: i * 0.05,
        }
      );
    });

    // Animate tech stack images in
    if (techImgRefs.current.length) {
      gsap.fromTo(
        techImgRefs.current,
        {
          y: 60,
          opacity: 0,
          scale: 0.7,
          filter: "blur(8px)",
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "back.out(1.7)",
          stagger: 0.15,
          scrollTrigger: {
            trigger: techImgRefs.current[0]?.parentNode,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Add hover effect
      techImgRefs.current.forEach((img) => {
        if (img) {
          img.addEventListener("mouseenter", () => {
            gsap.to(img, { scale: 1.12, rotate: 6, duration: 0.3, ease: "power2.out" });
          });
          img.addEventListener("mouseleave", () => {
            gsap.to(img, { scale: 1, rotate: 0, duration: 0.3, ease: "power2.inOut" });
          });
        }
      });
    }
  // eslint-disable-next-line
  }, []);

  const splitText = (text) =>
    text.split("").map((char, i) => (
      <span key={i} className="inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-blue-100 via-purple-100 to-pink-100 text-gray-900 dark:text-white">
      {/* ---------- HERO INTRO ---------- */}
      <section className="flex flex-col items-center justify-center min-h-[80vh] py-24">
        <h1
          ref={titleRef}
          className="font-extrabold text-center leading-tight"
          style={{
            fontSize: "clamp(3.5rem, 10vw, 5rem)",
            background:
              "linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6, #60a5fa)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            letterSpacing: "0.04em",
            textShadow: "0 2px 24px #a78bfa55, 0 1px 0 #fff2",
          }}
        >
          {splitText("Not A Simple Todo App")}
        </h1>
        <p
          ref={subtitleRef}
          className="mt-8 text-2xl md:text-3xl font-semibold text-purple-600 dark:text-purple-300 text-center max-w-2xl"
        >
          Modern productivity for your daily tasks and groceries.
        </p>
        {/* Arrow Down with Bounce Effect */}
        <div className="flex justify-center mt-10 mb-6">
          <FaChevronDown
            className="animate-bounce text-pink-400 text-3xl"
            style={{ animationDuration: "1.2s" }}
          />
        </div>
      </section>

      {/* ---------- VERTICAL CONTENT ---------- */}
      <div className="max-w-4xl mx-auto px-6 space-y-32 pb-32">
        
        <section ref={(el) => (sectionsRef.current[0] = el)} className="bg-white/80 dark:bg-purple-950/60 rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-4 text-blue-600 dark:text-blue-300"> 💡What This App Is?</h2>
          <p className="text-gray-700 dark:text-gray-200 text-lg">
           Not a Simple Todo App is a thoughtfully designed productivity application that goes beyond traditional task management to support real-life daily organization. Instead of limiting users to basic to-do lists, the app provides a structured way to manage different types of tasks, including daily activities, personal goals, and grocery planning, all within a single, intuitive interface. The focus of the application is not just on functionality, but on delivering a smooth and engaging user experience that feels natural and efficient to use. Every interaction is designed to reduce friction, helping users stay focused, organized, and in control of their routines. Built with a modern full-stack architecture, the app balances performance, scalability, and usability, making it suitable for everyday use rather than just demonstration purposes. Overall, Not a Simple Todo App represents a practical approach to productivity, combining clean design, thoughtful features, and real-world use cases into a cohesive application.  
          </p>
        </section>

        <section ref={(el) => (sectionsRef.current[1] = el)} className="bg-white/80 dark:bg-purple-950/60 rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-4 text-purple-600 dark:text-purple-300">📈 What Makes It Different</h2>
          <ul className="list-disc pl-5 text-gray-700 dark:text-gray-200 text-lg space-y-2">
            <li>Designed around real-life daily routines, not just simple task listing</li>
            <li>Combines task management and grocery planning in a single, unified workflow</li>
            <li>Focuses on clarity and simplicity instead of feature overload</li>
            <li>Clean and intuitive user interface that reduces friction</li>
            <li>Smooth interactions and subtle animations for a refined experience</li>
            <li>Consistent behavior and predictable flows across the application</li>
            <li>Built with scalability and maintainability in mind</li>
            <li>Approached as a real product rather than a demo project</li>
          </ul>
        </section>

        <section ref={(el) => (sectionsRef.current[2] = el)} className="bg-white/80 dark:bg-purple-950/60 rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-4 text-pink-600 dark:text-pink-300">🪛 Technology Used</h2>
          <p className="text-gray-700 dark:text-gray-200 text-lg">
            Built with the MERN stack using scalable architecture and clean code practices.
          </p>
          <div className="mt-6 flex flex-wrap gap-6 justify-center items-center">
            <img
              ref={el => techImgRefs.current[0] = el}
              src={ReactLogo}
              alt="React"
              className="h-40 w-40 transition-all cursor-pointer"
            />
            <img
              ref={el => techImgRefs.current[1] = el}
              src={NodeLogo}
              alt="Node.js"
              className="h-40 w-40 transition-all cursor-pointer"
            />
            <img
              ref={el => techImgRefs.current[2] = el}
              src={MongoLogo}
              alt="MongoDB"
              className="h-40 w-40 transition-all cursor-pointer"
            />
            <img
              ref={el => techImgRefs.current[3] = el}
              src={ExpressLogo}
              alt="Express"
              className="h-40 w-40 transition-all cursor-pointer"
            />
          </div>
        </section>

        <section ref={(el) => (sectionsRef.current[4] = el)} className="bg-white/80 dark:bg-purple-950/60 rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-4 text-purple-600 dark:text-purple-300">ℹ️ About the Developer</h2>
          <p className="text-gray-700 dark:text-gray-200 text-lg">
            I am a MERN stack developer with a strong interest in building practical, user-focused web applications that solve real-world problems. My approach to development goes beyond writing functional code, focusing on clean architecture, reusable components, and smooth user experiences. I enjoy working across both frontend and backend, ensuring that applications are not only visually polished but also reliable, scalable, and easy to maintain. I believe that good software is created through thoughtful planning, attention to detail, and continuous improvement, which is why I actively refine my projects to enhance performance, usability, and overall structure. Through hands-on development, I consistently work on strengthening my problem-solving skills and expanding my understanding of modern web technologies, with the goal of building applications that feel intuitive, purposeful, and production-ready.
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;
