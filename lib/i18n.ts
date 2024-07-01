import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import { getLocales } from "expo-localization"
const { languageCode } = getLocales()[0]

i18n.use(initReactI18next).init({
  lng: languageCode ?? "en",
  supportedLngs: ["en", "es"],
  compatibilityJSON: "v3",
  resources: {
    en: {
      translation: {
        "Nombres de los": "Name of the",
        equipos: "teams",
        jugadores: "players",
        Equipo: "Team",
        Jugador: "Player",
        "Dos equipos": "Two teams",
        "Tres equipos": "Three teams",
        "Cuatro Equipos": "Four teams",
        "Selecciona el limite de la partida": "Select the game limit",
        Continuar: "Continue",
        "Seguro que desea terminar este juego?":
          "Are you sure you want to end this game?",
        Terminar: "End Game",
        "Reiniciar el juego con los mismos jugadores?":
          "Restart the game with the same players?",
        Reiniciar: "Restart",
        "Desea borrarlo?": "Delete?",
        Borrar: "Delete",
        Ganador: "Winner",
        Cancelar: "Cancel",
        Puntuación: "Score",
        "Seguro que quiere eliminarlo del historial?":
          "Are you sure you want to delete it from history?",
        "Agregar puntuación": "Add score",
        Limite: "Limit",
        Aceptar: "Accept",
        "No puede dejarlo vacío": "Can't leave this empty",
        Juego: "Game",
        Historial: "History",
        "Borrar todo el historial": "Delete all history",
        "Borrar todo": "Delete all",
        "Seguro que quiere borrar todo el historial?":
          "Are you sure you want to delete all your history?",
        "Aun no tienes historial, juega una partida":
          "You don't have history yet, play a game",
      },
    },
  },
})
