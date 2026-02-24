# 🎯 ML Guide Interactive

> Guía interactiva de consulta rápida para Ciencia de Datos y Machine Learning

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC.svg)](https://tailwindcss.com/)

Una aplicación web interactiva que ayuda a científicos de datos, analistas y estudiantes a:
- ✅ Elegir el modelo de ML adecuado mediante un árbol de decisión
- 🏭 Explorar casos de uso reales por industria
- ⚡ Aplicar mejores prácticas y tips probados
- 📋 Seguir un checklist completo para proyectos de ML

![Screenshot de la aplicación](./docs/screenshot.png)

---

## 🚀 Demo en Vivo

👉 **[Ver Demo](https://tu-usuario.github.io/ml-guide-interactive)**

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Tecnologías](#-tecnologías)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)
- [Autor](#-autor)

---

## ✨ Características

### 🌳 Árbol de Decisión Interactivo
Navega paso a paso respondiendo preguntas sobre tu problema para descubrir:
- El modelo de ML más adecuado
- Ventajas y desventajas
- Cuándo usarlo (y cuándo no)
- Código de ejemplo para empezar

### 🏭 Casos de Uso por Industria
Explora más de 8 casos de uso reales en:
- **Retail & E-commerce**: Churn, demanda, segmentación
- **Manufactura**: Mantenimiento predictivo, control de calidad
- **Finanzas**: Credit scoring, detección de fraude
- **Marketing**: Segmentación, propensión de compra

Con filtros por:
- Industria
- Búsqueda de texto (problema/modelo)

### ⚡ Tips Rápidos
Principios fundamentales organizados en categorías:
- Simple primero
- Conoce tus restricciones
- Métrica de negocio > métrica técnica
- Data quality > model complexity
- Deploy > perfect

### ✅ Checklist de Proyecto ML
Lista verificable de 5 fases:
1. Definición del problema
2. Auditoría de datos
3. Feature engineering
4. Desarrollo del modelo
5. Deployment

---

## 🛠️ Instalación

### Prerrequisitos

- Node.js >= 14.x
- npm >= 6.x o yarn >= 1.22

### Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/ml-guide-interactive.git
cd ml-guide-interactive

# Instalar dependencias
npm install
# o con yarn
yarn install

# Ejecutar en modo desarrollo
npm run dev
# o con yarn
yarn dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para Producción

```bash
# Crear build optimizado
npm run build
# o con yarn
yarn build

# Preview del build
npm run preview
# o con yarn
yarn preview
```

Los archivos estáticos se generarán en la carpeta `dist/`

---

## 💻 Uso

### Como Aplicación Web

1. Navega por las secciones usando el menú lateral
2. **Árbol de Decisión**: Haz clic en las respuestas para avanzar
3. **Casos por Industria**: Filtra y busca casos específicos
4. **Tips Rápidos**: Consulta principios fundamentales
5. **Checklist**: Marca items conforme avanzas en tu proyecto

### Como Referencia en tus Proyectos

Puedes usar este repositorio como:
- 📚 Material educativo para cursos de ML/DS
- 🎓 Recurso de onboarding para nuevos analistas
- 📖 Guía de consulta rápida durante proyectos
- 🏫 Herramienta de enseñanza interactiva

---

## 📁 Estructura del Proyecto

```
ml-guide-interactive/
│
├── src/
│   ├── App.jsx              # Componente principal
│   ├── main.jsx             # Entry point
│   └── index.css            # Estilos globales
│
├── public/
│   └── vite.svg
│
├── docs/
│   ├── screenshot.png       # Screenshot para README
│   └── demo.gif             # GIF animado (opcional)
│
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── README.md
├── LICENSE
└── CONTRIBUTING.md
```

---

## 🔧 Tecnologías

Este proyecto está construido con:

- **[React 18](https://reactjs.org/)** - Biblioteca de UI
- **[Vite](https://vitejs.dev/)** - Build tool y dev server
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework de CSS utility-first
- **[Lucide React](https://lucide.dev/)** - Iconos modernos
- **JavaScript (ES6+)** - Lenguaje de programación

### Dependencias Principales

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "lucide-react": "^0.263.1"
}
```

### Dev Dependencies

```json
{
  "@vitejs/plugin-react": "^4.0.3",
  "autoprefixer": "^10.4.14",
  "postcss": "^8.4.27",
  "tailwindcss": "^3.3.3",
  "vite": "^4.4.5"
}
```

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si quieres mejorar esta guía:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

Por favor lee [CONTRIBUTING.md](CONTRIBUTING.md) para más detalles sobre nuestro código de conducta y el proceso para enviar pull requests.

### Ideas para Contribuciones

- 📊 Agregar más casos de uso por industria
- 🎨 Mejorar el diseño visual
- 🌍 Traducción a otros idiomas
- 📚 Expandir el árbol de decisión con más escenarios
- 🐛 Reportar y corregir bugs
- 📖 Mejorar la documentación

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 👨‍💻 Autor

**Natalia Castaño**
- LinkedIn: [tu-perfil](https://linkedin.com/in/tu-perfil)
- Email: tu-email@ejemplo.com
- GitHub: [@tu-usuario](https://github.com/tu-usuario)

---

## 🙏 Agradecimientos

- Inspirado en las mejores prácticas de la industria de ML/DS
- Diseño influenciado por [Distill.pub](https://distill.pub)
- Basado en experiencias reales de proyectos de Data Science

---

## 📚 Recursos Relacionados

- [Hands-On Machine Learning](https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/) - Libro de Aurélien Géron
- [Scikit-learn Documentation](https://scikit-learn.org/stable/) - Documentación oficial
- [Fast.ai](https://www.fast.ai/) - Cursos prácticos de ML
- [Kaggle](https://www.kaggle.com/) - Competencias y datasets

---

## 📊 Estadísticas del Proyecto

![GitHub stars](https://img.shields.io/github/stars/tu-usuario/ml-guide-interactive?style=social)
![GitHub forks](https://img.shields.io/github/forks/tu-usuario/ml-guide-interactive?style=social)
![GitHub issues](https://img.shields.io/github/issues/tu-usuario/ml-guide-interactive)
![GitHub pull requests](https://img.shields.io/github/issues-pr/tu-usuario/ml-guide-interactive)

---

## 📝 Changelog

### v1.0.0 (2026-02-03)
- 🎉 Release inicial
- 🌳 Árbol de decisión interactivo
- 🏭 8+ casos de uso por industria
- ⚡ Tips rápidos y mejores prácticas
- ✅ Checklist de proyecto completo

---

<div align="center">
  <p>Si este proyecto te fue útil, considera darle una ⭐</p>
  <p>Hecho con ❤️ y ☕ por científicos de datos, para científicos de datos</p>
</div>
