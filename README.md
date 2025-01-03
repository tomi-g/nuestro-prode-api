# API del Juego de los Novios

Esta es la API backend para el juego de preguntas sobre los novios.

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Crear archivo .env con las siguientes variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/wedding-game
```

3. Iniciar el servidor:
```bash
npm run dev
```

## Endpoints

### Preguntas

- GET `/api/questions` - Obtener todas las preguntas (sin respuestas correctas)
- POST `/api/questions` - Crear nueva pregunta
- POST `/api/questions/correct-answers` - Enviar respuestas correctas (admin)
- GET `/api/questions/with-answers` - Obtener preguntas con respuestas correctas (admin)

### Respuestas

- POST `/api/answers` - Enviar respuestas del jugador
- POST `/api/answers/calculate-scores` - Calcular puntajes
- GET `/api/answers/results` - Obtener tabla de posiciones

## Estructura de datos

### Pregunta
```json
{
  "id": 1,
  "text": "¿Quién dijo primero 'Te Amo'?",
  "correctAnswer": "Tomi"
}
```

### Respuesta del jugador
```json
{
  "playerName": "Juan",
  "answers": [
    {
      "questionId": 1,
      "answer": "Tomi"
    }
  ]
}
```
