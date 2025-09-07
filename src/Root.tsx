import React from 'react';

type RootProps = {
  children: React.ReactNode;
};

export default function Root({ children }: RootProps) {
  return (
    <div className="root-container">
      {/* You can add global nav, header, footer here later */}
      {children}
    </div>
  );
}
