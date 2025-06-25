"use client";

import React from "react";
import { CyberButton } from "../snippets";

const CyberButtonDemo: React.FC = () => {
  const handleButtonClick = (type: number) => {
    console.log(`Cyber button ${type} clicked!`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#110F0C",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        gap: "2rem",
      }}
    >
      <h1
        style={{
          color: "#ff0000",
          fontFamily: "monospace",
          fontSize: "2rem",
          marginBottom: "2rem",
        }}
      >
        Cyber Button Demo
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "2rem",
          maxWidth: "800px",
          width: "100%",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h3 style={{ color: "#ff0000", fontFamily: "monospace", marginBottom: "1rem" }}>Button Type 1</h3>
          <CyberButton type={1} size={150} color="#ff0000" onClick={() => handleButtonClick(1)} />
        </div>

        <div style={{ textAlign: "center" }}>
          <h3 style={{ color: "#ff0000", fontFamily: "monospace", marginBottom: "1rem" }}>Button Type 2</h3>
          <CyberButton type={2} size={150} color="#00ff00" onClick={() => handleButtonClick(2)} />
        </div>

        <div style={{ textAlign: "center" }}>
          <h3 style={{ color: "#ff0000", fontFamily: "monospace", marginBottom: "1rem" }}>Button Type 3</h3>
          <CyberButton type={3} size={150} color="#0000ff" onClick={() => handleButtonClick(3)} />
        </div>

        <div style={{ textAlign: "center" }}>
          <h3 style={{ color: "#ff0000", fontFamily: "monospace", marginBottom: "1rem" }}>Button Type 4</h3>
          <CyberButton type={4} size={150} color="#ffff00" onClick={() => handleButtonClick(4)} />
        </div>
      </div>

      <div
        style={{
          marginTop: "2rem",
          textAlign: "center",
          color: "#666",
          fontFamily: "monospace",
        }}
      >
        <p>Click any button to see the animation!</p>
        <p>Each button type has a unique animation pattern.</p>
      </div>
    </div>
  );
};

export default CyberButtonDemo;
