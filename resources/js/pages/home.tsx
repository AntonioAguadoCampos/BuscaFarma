/* eslint-disable @typescript-eslint/no-explicit-any */
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function BuscaFarma() {
  return (
    <div className="min-h-screen bg-white p-6 font-sans">
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
          <CardContent className="p-6 flex items-center justify-center md:w-1/2">
            <div>
              <p className="text-lg text-green-900 text-center md:text-justify">
                BuscaFarma es una aplicación diseñada para ayudarte a encontrar medicamentos disponibles en farmacias cercanas de forma rápida y confiable.
              </p>
              <ul className="list-disc pl-6 mt-4 text-base text-emerald-700 text-left">
                <li>Facilitamos a los farmacéuticos el dar a conocer los productos con los que trabajan</li>
                <li>A los compradores les proporcionamos la información de las farmacias que trabajan el medicamento que necesitan</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}