import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = () => (
  <Link
    to="/"
    className="text-3xl font-bold text-yellow-400 tracking-wider"
  >
    MovieRadar
  </Link>
);