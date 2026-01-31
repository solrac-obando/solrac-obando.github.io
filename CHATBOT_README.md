# Chatbot FAQ - Solrac-tech

## Descripción
He creado un chatbot de tipo rule-based (basado en reglas) para preguntas frecuentes que está integrado en tu landing page. El chatbot está diseñado para responder preguntas sobre servicios, precios, tiempos de entrega, y facilita el proceso de contratación.

## Características del Chatbot

### 🎯 Funcionalidades Principales
- **Respuestas Automatizadas**: Basadas en reglas predefinidas con palabras clave
- **Interface Moderna**: Diseño responsive con animaciones suaves
- **Posicionamiento Fijo**: Siempre visible en el lateral derecho (no se oculta al scroll)
- **Indicador de Actividad**: Badge de notificación llamativa para mayor visibilidad
- **Animaciones Atractivas**: Efectos de pulso y rebote para llamar la atención
- **Preguntas Sugeridas**: Botones de acceso rápido a preguntas comunes
- **Responsive Design**: Funciona perfectamente en desktop y móvil

### 📝 Base de Conocimientos
El archivo `faq.json` contiene respuestas sobre:
- Servicios ofrecidos (Landing Express, Landing PRO CRO, Web Corporativa)
- Precios de cada servicio
- Tiempos de entrega
- Información sobre despliegue ($30 adicional)
- Métodos de contacto
- Tecnologías utilizadas
- Ubicación y disponibilidad

### 🛠️ Instalación y Configuración

1. **Archivos Creados/Modificados**:
   - `faq.json` - Base de datos de preguntas y respuestas
   - `script.js` - Lógica del chatbot (líneas 571-800 aproximadamente)
   - `styles.css` - Estilos del chatbot (líneas 377-430 aproximadamente)

2. **Configuración para GitHub Pages**:
   - Todos los archivos son compatibles con GitHub Pages
   - No requiere servidor backend
   - Funciona con fetch() para cargar el JSON

### 🚀 Uso del Chatbot

1. **Activación**: El chatbot se carga automáticamente al abrir la página
2. **Apertura**: Hacer clic en el botón flotante del chatbot (esquina inferior derecha)
3. **Interacción**: 
   - Escribir preguntas en el campo de texto
   - Usar los botones de preguntas sugeridas
   - El bot responde con información relevante

### 🎨 Personalización

#### Modificar Preguntas y Respuestas
Edita el archivo `faq.json` para agregar/modificar:
```json
{
  "keywords": ["palabra1", "palabra2"],
  "question": "¿Tu pregunta?",
  "answer": "Tu respuesta detallada aquí."
}
```

#### Cambiar Estilos
Modifica las clases CSS en `styles.css`:
- `.chatbot-toggle` - Botón principal
- `.chatbot-window` - Ventana del chat
- `.message` - Estilos de mensajes

#### Ajustar Posición
Cambia las clases CSS para reposicionar:
- `bottom-6 right-6` - Posición actual (esquina inferior derecha)
- `bottom-6 left-6` - Esquina inferior izquierda

### 📱 Compatibilidad

- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Móvil (iOS Safari, Android Chrome)
- ✅ GitHub Pages
- ✅ Todos los navegadores modernos

### 🔧 Funciones JavaScript Principales

- `FAQChatbot` - Clase principal del chatbot
- `openChatbot()` - Función global para abrir el chatbot
- `processQuestion()` - Lógica de búsqueda de respuestas
- `findBestMatch()` - Algoritmo de coincidencias

### 💡 Características Técnicas

- **Algoritmo de Búsqueda**: Busca coincidencias por palabras clave
- **Fallback Inteligente**: Sugiere preguntas relacionadas si no encuentra respuesta exacta
- **Scroll Automático**: Los mensajes se desplazan automáticamente
- **Loading States**: Indicadores visuales de carga
- **Error Handling**: Manejo graceful de errores de carga

### 📊 Métricas de Uso

Para trackear el uso del chatbot, puedes agregar:
```javascript
// Ejemplo de tracking de eventos
if (typeof gtag !== 'undefined') {
    gtag('event', 'chatbot_opened', {
        event_category: 'engagement',
        event_label: 'faq_chatbot'
    });
}
```

### 🔄 Mantenimiento

1. **Actualizar FAQ**: Modificar `faq.json` según necesidades
2. **Monitorear Preguntas**: Revisar qué preguntas no tienen respuesta
3. **Optimizar Respuestas**: Mejorar respuestas basado en feedback de usuarios

### 📝 Notas Importantes

- El chatbot está optimizado para GitHub Pages
- No requiere configuración adicional
- Carga rápida y sin dependencias externas
- Compatible con el sistema existente de la landing page

## Integración Completada

✅ **Chatbot integrado como botón principal de contacto**
✅ **Botones de Fiverr restaurados en tarjetas de servicios**
✅ **Responsive design implementado**
✅ **Compatible con GitHub Pages**
✅ **Base de datos JSON configurada**
✅ **Estilos CSS optimizados**

El chatbot está listo para usar y proporcionar una experiencia de usuario mejorada en tu landing page.