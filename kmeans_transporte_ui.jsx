
// kmeans_transporte_ui.jsx
// Interfaz para visualizar explicación de cobertura de transporte

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Globe } from "lucide-react";
import { motion } from "framer-motion";

const ZONAS = [
  { id: 0, zona: 'Centro', cobertura: 'Alta', explicacion: 'Muchas paradas cercanas entre sí.', color: 'verde' },
  { id: 1, zona: 'Norte', cobertura: 'Media', explicacion: 'Paradas algo dispersas.', color: 'naranja' },
  { id: 2, zona: 'Sur', cobertura: 'Baja', explicacion: 'Pocas paradas en un área amplia.', color: 'rojo' },
];

export default function KMeansTransporteUI() {
  const [zonaSeleccionada, setZonaSeleccionada] = useState(null);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <motion.h1 className="text-3xl font-bold mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Mi Ruta CBBA – Cobertura del Transporte Público
      </motion.h1>

      <p className="mb-6 text-sm text-muted-foreground">
        Selecciona tu zona para ver la cobertura estimada según el análisis con K-Means.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {ZONAS.map((zona) => (
          <Card key={zona.id} onClick={() => setZonaSeleccionada(zona)} className="cursor-pointer hover:shadow-md">
            <CardContent className="flex items-center p-4 space-x-4">
              <MapPin className="w-6 h-6" />
              <div>
                <p className="font-semibold">Zona: {zona.zona}</p>
                <p className="text-sm text-muted-foreground">Cobertura: {zona.cobertura}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {zonaSeleccionada && (
        <motion.div
          className="mt-8 p-4 rounded-xl border shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-semibold mb-2">Zona: {zonaSeleccionada.zona}</h2>
          <p className="mb-1">Cobertura estimada: <strong>{zonaSeleccionada.cobertura}</strong></p>
          <p className="text-muted-foreground">🧠 Explicación: {zonaSeleccionada.explicacion}</p>
        </motion.div>
      )}

      <div className="mt-10 text-center">
        <Button variant="outline" asChild>
          <a href="/mapa_cobertura.html" target="_blank">
            <Globe className="mr-2 w-4 h-4" /> Ver Mapa Interactivo
          </a>
        </Button>
      </div>
    </div>
  );
}
