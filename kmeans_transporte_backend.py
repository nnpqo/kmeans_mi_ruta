# kmeans_transporte_backend.py
# Proyecto: Análisis y explicación de cobertura de transporte en Cochabamba usando K-Means

import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import folium

# Paso 1: Cargar y preparar los datos
# Usamos el archivo GTFS "stops.txt" que contiene las paradas del transporte público en Cochabamba
df = pd.read_csv('stops.txt')
df = df[['stop_id', 'stop_lat', 'stop_lon']].dropna()

# Paso 2: Escalado de coordenadas para mejorar el rendimiento del modelo
scaler = StandardScaler()
coords = scaler.fit_transform(df[['stop_lat', 'stop_lon']])

# Paso 3: Aplicación del algoritmo K-Means
kmeans = KMeans(n_clusters=3, random_state=42)
df['grupo'] = kmeans.fit_predict(coords)
df['centroide_lat'] = df['grupo'].map(lambda g: kmeans.cluster_centers_[g][0])
df['centroide_lon'] = df['grupo'].map(lambda g: kmeans.cluster_centers_[g][1])

# Paso 4: Generación de explicaciones tipo XAI (aprendizaje basado en explicaciones)
def generar_explicacion(grupo):
    if grupo == 2:
        return "Alta cobertura: muchas paradas cercanas entre sí."
    elif grupo == 1:
        return "Cobertura media: paradas algo dispersas."
    elif grupo == 0:
        return "Cobertura baja: pocas paradas en un área amplia."
    else:
        return "Cobertura desconocida"

df['explicacion'] = df['grupo'].apply(generar_explicacion)

# Paso 5: Crear mapa interactivo con Folium
m = folium.Map(location=[-17.38, -66.16], zoom_start=12)

# Verifica que los colores estén correctamente asignados
colors = ['red', 'green', 'orange']  # 0: verde (alta cobertura), 1: naranja (media), 2: rojo (baja)

for _, row in df.iterrows():
    folium.CircleMarker(
        location=[row['stop_lat'], row['stop_lon']],
        radius=4,
        color=colors[row['grupo']],  # Asignación basada en el grupo
        fill=True,
        fill_opacity=0.7,
        tooltip=row['explicacion']
    ).add_to(m)

# Exportar resultado a HTML para mostrar el mapa en un navegador
m.save("mapa_cobertura.html")
print("✅ Mapa generado: mapa_cobertura.html")
