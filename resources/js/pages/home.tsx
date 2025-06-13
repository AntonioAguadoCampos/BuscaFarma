/* eslint-disable @typescript-eslint/no-explicit-any */
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function BuscaFarma() {
  return (
    <div className="flex flex-col min-h-screen bg-white p-6 font-sans">
      <main className="flex-grow p-6 sm:p-6">
        {/* Header */}
        <header className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-green-700 mb-8 text-center">
          BuscaFarma
        </header>

        {/* Menu */}
        <nav className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 md:gap-20 lg:gap-36 mb-12">
          <Button className="text-lg sm:text-xl md:text-2xl px-10 sm:px-16 md:px-20 py-6 sm:py-10 md:py-12 text-green-800 border-green-800 hover:bg-green-100" variant="outline">
            <a href="http://buscafarma.test/contact">Contacto</a>
          </Button>
          <Button className="text-lg sm:text-xl md:text-2xl px-8 py-6 sm:py-10 md:py-12 text-green-800 border-green-800 hover:bg-green-100" variant="outline">
            <a href="http://buscafarma.test/search">Buscador de medicamentos</a>
          </Button>
        </nav>

        {/* Info Card */}
        <div className="flex justify-center px-4">
          <Card className="flex flex-col md:flex-row max-w-4xl w-full shadow-lg rounded-2xl overflow-hidden">
            {/* Description */}
              <div className="md:w-1/2 flex items-center justify-center bg-white p-4">
                <img 
                  src="logo1.jpeg" 
                  alt="BuscaFarma"
                  className="h-100 w-auto object-contain"
                />
              </div>

            <CardContent className="p-6 flex items-center justify-center md:w-1/2">
              <div>
                <p className="text-2xl text-green-900 text-center md:text-justify">
                  BuscaFarma es una aplicación diseñada para ayudarte a encontrar medicamentos disponibles en farmacias cercanas de forma rápida y confiable.
                </p>
                <ul className="list-disc text-lg pl-6 mt-4 text-base text-emerald-700 text-left">
                  <li>Facilitamos a los farmacéuticos el dar a conocer los productos con los que trabajan</li>
                  <li>A los compradores les proporcionamos la información de las farmacias que trabajan el medicamento que necesitan</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="max-w-5xl mx-auto my-12 px-4">
        <video
          className="w-full rounded-xl shadow-lg"
          controls
          autoPlay
          muted
          loop
        >
          <source src="videos/prueba.mp4" type="video/mp4" />
          Tu navegador no soporta la reproducción de vídeo.
        </video>
      </div>
      </main>
      <footer className="w-full bg-green-700 text-white py-6 mt-auto">
          <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-xl font-bold">BuscaFarma ©</span>
          <div className="flex flex-col sm:flex-row sm:space-x-6 text-base sm:text-xl text-center sm:text-left">
              <span role="img" aria-label="teléfono">📞 666 000 000</span>
              <span role="img" aria-label="carta">✉️ buscafarma@gmail.com</span>
          </div>
          </div>
      </footer>
    </div>
    
  );
}