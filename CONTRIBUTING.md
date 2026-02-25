# Guía de Contribución

¡Gracias por tu interés en contribuir a ML Guide Interactive! 🎉

## 📋 Código de Conducta

Se espera que todos los participantes sean respetuosos y profesionales en sus interacciones.

## 🚀 ¿Cómo Puedo Contribuir?

### 🐛 Reportar Bugs

Si encuentras un bug:

1. **Verifica** que no esté ya reportado en la sección de Issues del repositorio
2. **Crea un nuevo issue** con:
   - Título descriptivo
   - Pasos para reproducir el bug
   - Comportamiento esperado vs actual
   - Screenshots si es aplicable
   - Versión del navegador y sistema operativo

### 💡 Sugerir Mejoras

Para sugerir nuevas funcionalidades:

1. **Verifica** que no exista una sugerencia similar
2. **Crea un issue** con el tag `enhancement`
3. **Describe** claramente:
   - El problema que resuelve
   - La solución propuesta
   - Alternativas consideradas
   - Mockups si es aplicable

### 📝 Pull Requests

#### Proceso

1. **Fork** el repositorio
2. **Crea una rama** desde `main`:
   ```bash
   git checkout -b feature/nombre-descriptivo
   ```
3. **Realiza tus cambios**:
   - Sigue las convenciones de código existentes
   - Agrega comentarios si es necesario
   - Actualiza la documentación si aplica
4. **Commit** tus cambios:
   ```bash
   git commit -m "feat: descripción clara del cambio"
   ```
5. **Push** a tu fork:
   ```bash
   git push origin feature/nombre-descriptivo
   ```
6. **Abre un Pull Request** en GitHub

#### Convenciones de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Formato, punto y coma faltantes, etc
- `refactor:` Refactorización de código
- `test:` Agregar tests
- `chore:` Tareas de mantenimiento

Ejemplos:
```bash
feat: agregar filtro por tipo de modelo
fix: corregir navegación en árbol de decisión
docs: actualizar README con nuevas instrucciones
style: aplicar formato consistente a código
```

#### Checklist para Pull Requests

Antes de enviar tu PR, verifica:

- [ ] El código sigue el estilo del proyecto
- [ ] Los commits siguen Conventional Commits
- [ ] La documentación está actualizada
- [ ] No hay errores en consola
- [ ] La aplicación funciona correctamente
- [ ] Has probado en diferentes navegadores (si aplica)

## 🎨 Guías de Estilo

### JavaScript/React

- **Componentes funcionales** con hooks
- **Nombres descriptivos** para variables y funciones
- **Destructuring** cuando sea posible
- **Arrow functions** para callbacks
- **Comentarios** solo cuando sea necesario explicar "por qué", no "qué"

Ejemplo:
```jsx
// ✅ Bueno
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = (data) => {
  // Explicación del por qué si es complejo
  processData(data);
};

// ❌ Malo
const [a, setA] = useState(false);
var handleSubmit = function(data) {
  processData(data); // Procesa los datos
}
```

### CSS/Tailwind

- **Utility classes** de Tailwind primero
- **Clases personalizadas** solo cuando sea necesario
- **Mobile-first** approach
- **Consistencia** en espaciado (múltiplos de 4)

### Estructura de Archivos

```
src/
  ├── components/       # Componentes reutilizables
  ├── data/            # Datos estáticos (casos de uso, etc)
  ├── utils/           # Funciones utilitarias
  ├── App.jsx          # Componente principal
  └── main.jsx         # Entry point
```

## 📚 Recursos

### Para Nuevos Contribuidores

- [React Documentation](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)

### Ideas para Contribuir

#### 🟢 Principiante

- Corregir typos en documentación
- Mejorar mensajes de error
- Agregar comentarios explicativos
- Actualizar dependencias

#### 🟡 Intermedio

- Agregar nuevos casos de uso por industria
- Mejorar responsive design
- Optimizar performance
- Agregar animaciones

#### 🔴 Avanzado

- Implementar búsqueda con fuzzy matching
- Agregar internacionalización (i18n)
- Crear sistema de temas
- Integrar analytics

## 📄 Licencia

Al contribuir, aceptas que tus contribuciones serán licenciadas bajo la [Licencia MIT](LICENSE).

---

¡Gracias por contribuir! 🙌

¡Gracias por contribuir! 🙌
