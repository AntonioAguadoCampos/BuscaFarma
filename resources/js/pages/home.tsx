/* eslint-disable @typescript-eslint/no-explicit-any */
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

//NO SÉ PARA QUE SIRVEN ESTOS IMPORTS, PERO LOS DEJO POR SI ACASO 
//import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
//import AppLayout from '@/layouts/app-layout';
//import { type BreadcrumbItem } from '@/types';


/**
 * <div className="relative w-full md:w-1/2 h-64 md:h-auto">
            <img
              src="/logo-farmacia.png"
              alt="Logo de BuscaFarma"
              className="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl"
          </div>
 */

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BuscaFarma() {
  return (
    <div className="min-h-screen bg-white p-6 font-sans">
      {/* Header */}
      <header className="text-8xl font-bold text-green-700 mb-8 text-center">
        BuscaFarma
      </header>

      {/* Menu */}
      <nav className="flex justify-center gap-36 mb-12">        
        <Button className="text-2xl px-20 py-12 text-green-800 border-green-800 hover:bg-green-100" variant="outline">
            <a href="http://buscafarma.test/contact">Contacto</a>
        </Button>
        <Button className="text-2xl px-8 py-12 text-green-800 border-green-800 hover:bg-green-100" variant="outline">
            <a href="http://buscafarma.test/search">Buscador de medicamentos</a>
        </Button>
      </nav>

      {/* Info Card */}
      <div className="flex justify-center">
        <Card className="flex flex-col md:flex-row max-w-4xl w-full shadow-lg rounded-2xl overflow-hidden">
          {/* Logo Image */}
          

          {/* Description */}
          <CardContent className="p-6 flex items-center justify-center md:w-1/2">
            <p className="text-1xl text-green-900 text-center md:text-justify">
              BuscaFarma es una aplicación diseñada para ayudarte a encontrar medicamentos disponibles en farmacias cercanas de forma rápida y confiable. 
                <ul className="list-disc pl-6 mt-4 text-1xl text-emerald-700 text-center md:text-justify">
                    <li>Facilitamos a los farmacéuticos el dar a conocer los productos con los que trabajan</li>
                    <li>A los compradores les proporcionamos la información de las farmacias que trabajan el medicamento que necesitan</li>
                </ul>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}