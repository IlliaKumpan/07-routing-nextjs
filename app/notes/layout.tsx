import React from "react";

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="notes-page-container">
      <section className="notes-content">
        {children}
      </section>
    </div>
  );
}