import React from 'react';
import Link from 'next/link';

function Card({ title, description, link }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
      <Link href={link} passHref={true} legacyBehavior>
        <a>Ver Mais</a>
      </Link>
    </div>
  );
}

export default Card;
