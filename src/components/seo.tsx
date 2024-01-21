import type { FC } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

interface SeoProps {
  title?: string;
}

export const Seo: FC<SeoProps> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

Seo.propTypes = {
  title: PropTypes.string,
};
