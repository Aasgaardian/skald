// src/components/Layout.jsx
import React from 'react'
import Head from 'next/head'

export default function Layout({children, title = 'Skald | Scrollytelling Solution'}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Skald - A powerful scrollytelling solution built with Next.js and Sanity"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-grow">{children}</main>

      <footer className="py-6 bg-gray-100">
        <div className="container mx-auto text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Skald Scrollytelling
        </div>
      </footer>
    </div>
  )
}
