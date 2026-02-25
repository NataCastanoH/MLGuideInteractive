# 🚀 Guía de Deployment

Esta guía te ayudará a desplegar ML Guide Interactive en diferentes plataformas.

---

## 📦 GitHub Pages

La forma más simple de desplegar tu aplicación de forma gratuita.

### Configuración Inicial

1. **Instalar gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Actualizar package.json**:
   ```json
   {
     "homepage": "https://NataCastanoH.github.io/ml-guide-interactive",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Actualizar vite.config.js**:
   ```javascript
   export default defineConfig({
     base: '/ml-guide-interactive/',  // Nombre de tu repo
     // ... resto de la configuración
   })
   ```

### Deploy

```bash
npm run deploy
```

La aplicación estará disponible en: `https://NataCastanoH.github.io/ml-guide-interactive`

### GitHub Actions (Automático)

Crea `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

---

## ☁️ Vercel

Deploy con un click y actualizaciones automáticas.

### Método 1: Interfaz Web

1. Ve a [vercel.com](https://vercel.com)
2. Conecta tu repositorio de GitHub
3. Vercel detectará automáticamente Vite
4. Click en "Deploy"

### Método 2: CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

---

## 🌐 Netlify

Otra excelente opción gratuita con CI/CD.

### Método 1: Drag & Drop

1. Construye tu aplicación: `npm run build`
2. Ve a [netlify.com](https://netlify.com)
3. Arrastra la carpeta `dist` al área de deploy

### Método 2: Git

1. Conecta tu repositorio en Netlify
2. Configura:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Click en "Deploy site"

### netlify.toml (Opcional)

Crea `netlify.toml` en la raíz:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 🎯 Railway

Para deploy full-stack con backend si lo necesitas en el futuro.

```bash
# Instalar Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
railway up
```

---

## 🐳 Docker

Si prefieres containerizar tu aplicación.

### Dockerfile

Crea `Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

Crea `nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Build y Run

```bash
# Build
docker build -t ml-guide-interactive .

# Run
docker run -p 8080:80 ml-guide-interactive
```

---

## 📊 Variables de Entorno

Si necesitas variables de entorno:

### .env.example

```env
VITE_API_URL=https://api.ejemplo.com
VITE_ANALYTICS_ID=GA-XXXXXXXXX
```

### Uso en código

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

### En producción

- **Vercel/Netlify**: Configurar en el dashboard
- **GitHub Pages**: No soporta variables de entorno
- **Docker**: Pasar con `-e` flag

---

## ✅ Checklist Pre-Deploy

Antes de desplegar, verifica:

- [ ] `npm run build` funciona sin errores
- [ ] La aplicación funciona en `npm run preview`
- [ ] Actualizaste URLs en package.json y README
- [ ] Probaste en diferentes navegadores
- [ ] Optimizaste imágenes (si hay)
- [ ] Configuraste meta tags SEO

---

## 🔧 Troubleshooting

### Error: "Failed to load module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: "404 en rutas"
- GitHub Pages: Necesitas hash router o SPA redirect
- Netlify/Vercel: Agregar redirects config

### Estilos no cargan
- Verifica `base` en vite.config.js
- Checa que Tailwind esté configurado correctamente

---

## 📈 Monitoreo

### Google Analytics

1. Crea una cuenta en [analytics.google.com](https://analytics.google.com)
2. Obtén tu Tracking ID
3. Agrega a `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA-XXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA-XXXXXXXXX');
</script>
```

### Plausible Analytics

Alternativa privacy-friendly:

```html
<script defer data-domain="tu-dominio.com" src="https://plausible.io/js/script.js"></script>
```

---

## 🎉 Post-Deploy

Después de desplegar:

1. **Prueba** en diferentes dispositivos
2. **Comparte** en redes sociales
3. **Monitorea** analytics
4. **Responde** a issues de GitHub
5. **Itera** basado en feedback

---

¿Necesitas ayuda? Abre un [issue](https://github.com/NataCastanoH/MLGuideInteractive/issues) en GitHub.
