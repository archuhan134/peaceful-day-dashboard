
import { useState, useEffect } from 'react';

const translations = {
  en: {
    // Navigation
    dashboard: "Dashboard",
    planning: "Planning",
    mood: "Mood",
    habits: "Habits",
    routines: "Routines",
    reminders: "Reminders",
    profile: "Profile",
    settings: "Settings",
    
    // Profile Page
    signUpOrLogIn: "Sign up or log in",
    youAreCurrentlyInGuestMode: "You are currently in guest mode",
    dayStreak: "day streak",
    taskCompleted: "task completed",
    moodStats: "Mood Stats",
    taskStats: "Task Stats",
    viewAll: "View All",
    allMoods: "All Moods",
    noMoodEntriesYet: "No mood entries yet. Start tracking your moods to see them here!",
    selectMoodFor: "Select mood for",
    markAsComplete: "Mark as Complete",
    markAsIncomplete: "Mark as Incomplete",
    weeklyView: "Weekly View",
    monthlyView: "Monthly View",
    noMoodDataToDisplay: "No mood data to display yet. Start logging your feelings!",
    
    // Mood names
    happy: "Happy",
    calm: "Calm",
    sleepy: "Sleepy",
    thoughtful: "Thoughtful",
    stressed: "Stressed",
    sad: "Sad",
    angry: "Angry",
    grateful: "Grateful",
    excited: "Excited",
    neutral: "Neutral",
    
    // Common
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    close: "Close",
    back: "Back"
  },
  hi: {
    // Navigation
    dashboard: "डैशबोर्ड",
    planning: "योजना",
    mood: "मूड",
    habits: "आदतें",
    routines: "दिनचर्या",
    reminders: "अनुस्मारक",
    profile: "प्रोफ़ाइल",
    settings: "सेटिंग्स",
    
    // Profile Page
    signUpOrLogIn: "साइन अप या लॉग इन करें",
    youAreCurrentlyInGuestMode: "आप वर्तमान में गेस्ट मोड में हैं",
    dayStreak: "दिन की लकीर",
    taskCompleted: "कार्य पूर्ण",
    moodStats: "मूड आंकड़े",
    taskStats: "कार्य आंकड़े",
    viewAll: "सभी देखें",
    allMoods: "सभी मूड",
    noMoodEntriesYet: "अभी तक कोई मूड एंट्री नहीं। अपने मूड को ट्रैक करना शुरू करें!",
    selectMoodFor: "के लिए मूड चुनें",
    markAsComplete: "पूर्ण के रूप में चिह्नित करें",
    markAsIncomplete: "अपूर्ण के रूप में चिह्नित करें",
    weeklyView: "साप्ताहिक दृश्य",
    monthlyView: "मासिक दृश्य",
    noMoodDataToDisplay: "अभी तक कोई मूड डेटा प्रदर्शित करने के लिए नहीं। अपनी भावनाओं को लॉग करना शुरू करें!",
    
    // Mood names
    happy: "खुश",
    calm: "शांत",
    sleepy: "नींद आना",
    thoughtful: "विचारशील",
    stressed: "तनावग्रस्त",
    sad: "उदास",
    angry: "गुस्सा",
    grateful: "आभारी",
    excited: "उत्साहित",
    neutral: "तटस्थ",
    
    // Common
    save: "सहेजें",
    cancel: "रद्द करें",
    delete: "हटाएं",
    edit: "संपादित करें",
    close: "बंद करें",
    back: "वापस"
  },
  es: {
    // Navigation
    dashboard: "Tablero",
    planning: "Planificación",
    mood: "Estado de ánimo",
    habits: "Hábitos",
    routines: "Rutinas",
    reminders: "Recordatorios",
    profile: "Perfil",
    settings: "Configuración",
    
    // Profile Page
    signUpOrLogIn: "Regístrate o inicia sesión",
    youAreCurrentlyInGuestMode: "Actualmente estás en modo invitado",
    dayStreak: "racha de días",
    taskCompleted: "tarea completada",
    moodStats: "Estadísticas de Estado de Ánimo",
    taskStats: "Estadísticas de Tareas",
    viewAll: "Ver Todo",
    allMoods: "Todos los Estados de Ánimo",
    noMoodEntriesYet: "Aún no hay entradas de estado de ánimo. ¡Comienza a rastrear tus estados de ánimo para verlos aquí!",
    selectMoodFor: "Seleccionar estado de ánimo para",
    markAsComplete: "Marcar como Completo",
    markAsIncomplete: "Marcar como Incompleto",
    weeklyView: "Vista Semanal",
    monthlyView: "Vista Mensual",
    noMoodDataToDisplay: "No hay datos de estado de ánimo para mostrar aún. ¡Comienza a registrar tus sentimientos!",
    
    // Mood names
    happy: "Feliz",
    calm: "Tranquilo",
    sleepy: "Somnoliento",
    thoughtful: "Pensativo",
    stressed: "Estresado",
    sad: "Triste",
    angry: "Enojado",
    grateful: "Agradecido",
    excited: "Emocionado",
    neutral: "Neutral",
    
    // Common
    save: "Guardar",
    cancel: "Cancelar",
    delete: "Eliminar",
    edit: "Editar",
    close: "Cerrar",
    back: "Atrás"
  },
  fr: {
    // Navigation
    dashboard: "Tableau de bord",
    planning: "Planification",
    mood: "Humeur",
    habits: "Habitudes",
    routines: "Routines",
    reminders: "Rappels",
    profile: "Profil",
    settings: "Paramètres",
    
    // Profile Page
    signUpOrLogIn: "S'inscrire ou se connecter",
    youAreCurrentlyInGuestMode: "Vous êtes actuellement en mode invité",
    dayStreak: "série de jours",
    taskCompleted: "tâche terminée",
    moodStats: "Statistiques d'Humeur",
    taskStats: "Statistiques de Tâches",
    viewAll: "Voir Tout",
    allMoods: "Toutes les Humeurs",
    noMoodEntriesYet: "Aucune entrée d'humeur pour le moment. Commencez à suivre vos humeurs pour les voir ici !",
    selectMoodFor: "Sélectionner l'humeur pour",
    markAsComplete: "Marquer comme Terminé",
    markAsIncomplete: "Marquer comme Incomplet",
    weeklyView: "Vue Hebdomadaire",
    monthlyView: "Vue Mensuelle",
    noMoodDataToDisplay: "Aucune donnée d'humeur à afficher pour le moment. Commencez à enregistrer vos sentiments !",
    
    // Mood names
    happy: "Heureux",
    calm: "Calme",
    sleepy: "Somnolent",
    thoughtful: "Pensif",
    stressed: "Stressé",
    sad: "Triste",
    angry: "En colère",
    grateful: "Reconnaissant",
    excited: "Excité",
    neutral: "Neutre",
    
    // Common
    save: "Enregistrer",
    cancel: "Annuler",
    delete: "Supprimer",
    edit: "Modifier",
    close: "Fermer",
    back: "Retour"
  },
  de: {
    // Navigation
    dashboard: "Übersicht",
    planning: "Planung",
    mood: "Stimmung",
    habits: "Gewohnheiten",
    routines: "Routinen",
    reminders: "Erinnerungen",
    profile: "Profil",
    settings: "Einstellungen",
    
    // Profile Page
    signUpOrLogIn: "Registrieren oder anmelden",
    youAreCurrentlyInGuestMode: "Sie befinden sich derzeit im Gastmodus",
    dayStreak: "Tage-Serie",
    taskCompleted: "Aufgabe erledigt",
    moodStats: "Stimmungsstatistiken",
    taskStats: "Aufgabenstatistiken",
    viewAll: "Alle anzeigen",
    allMoods: "Alle Stimmungen",
    noMoodEntriesYet: "Noch keine Stimmungseinträge. Beginnen Sie mit der Verfolgung Ihrer Stimmungen, um sie hier zu sehen!",
    selectMoodFor: "Stimmung auswählen für",
    markAsComplete: "Als erledigt markieren",
    markAsIncomplete: "Als unvollständig markieren",
    weeklyView: "Wochenansicht",
    monthlyView: "Monatsansicht",
    noMoodDataToDisplay: "Noch keine Stimmungsdaten zum Anzeigen. Beginnen Sie mit der Protokollierung Ihrer Gefühle!",
    
    // Mood names
    happy: "Glücklich",
    calm: "Ruhig",
    sleepy: "Schläfrig",
    thoughtful: "Nachdenklich",
    stressed: "Gestresst",  
    sad: "Traurig",
    angry: "Wütend",
    grateful: "Dankbar",
    excited: "Aufgeregt",
    neutral: "Neutral",
    
    // Common
    save: "Speichern",
    cancel: "Abbrechen",
    delete: "Löschen",
    edit: "Bearbeiten",
    close: "Schließen",
    back: "Zurück"
  },
  pt: {
    // Navigation
    dashboard: "Painel",
    planning: "Planejamento",
    mood: "Humor",
    habits: "Hábitos",
    routines: "Rotinas",
    reminders: "Lembretes",
    profile: "Perfil",
    settings: "Configurações",
    
    // Profile Page
    signUpOrLogIn: "Inscrever-se ou fazer login",
    youAreCurrentlyInGuestMode: "Você está atualmente no modo convidado",
    dayStreak: "sequência de dias",
    taskCompleted: "tarefa concluída",
    moodStats: "Estatísticas de Humor",
    taskStats: "Estatísticas de Tarefas",
    viewAll: "Ver Tudo",
    allMoods: "Todos os Humores",
    noMoodEntriesYet: "Ainda não há entradas de humor. Comece a rastrear seus humores para vê-los aqui!",
    selectMoodFor: "Selecionar humor para",
    markAsComplete: "Marcar como Concluído",
    markAsIncomplete: "Marcar como Incompleto",
    weeklyView: "Visualização Semanal",
    monthlyView: "Visualização Mensal",
    noMoodDataToDisplay: "Nenhum dado de humor para exibir ainda. Comece a registrar seus sentimentos!",
    
    // Mood names
    happy: "Feliz",
    calm: "Calmo",
    sleepy: "Sonolento",
    thoughtful: "Pensativo",
    stressed: "Estressado",
    sad: "Triste",
    angry: "Raivoso",
    grateful: "Grato",
    excited: "Animado",
    neutral: "Neutro",
    
    // Common
    save: "Salvar",
    cancel: "Cancelar",
    delete: "Excluir",
    edit: "Editar",
    close: "Fechar",
    back: "Voltar"
  },
  it: {
    // Navigation
    dashboard: "Cruscotto",
    planning: "Pianificazione",
    mood: "Umore",
    habits: "Abitudini",
    routines: "Routine",
    reminders: "Promemoria",
    profile: "Profilo",
    settings: "Impostazioni",
    
    // Profile Page
    signUpOrLogIn: "Iscriviti o accedi",
    youAreCurrentlyInGuestMode: "Sei attualmente in modalità ospite",
    dayStreak: "serie di giorni",
    taskCompleted: "compito completato",
    moodStats: "Statistiche dell'Umore",
    taskStats: "Statistiche dei Compiti",
    viewAll: "Visualizza Tutto",
    allMoods: "Tutti gli Umori",
    noMoodEntriesYet: "Ancora nessuna voce dell'umore. Inizia a tracciare i tuoi umori per vederli qui!",
    selectMoodFor: "Seleziona umore per",
    markAsComplete: "Segna come Completato",
    markAsIncomplete: "Segna come Incompleto",
    weeklyView: "Vista Settimanale",
    monthlyView: "Vista Mensile",
    noMoodDataToDisplay: "Nessun dato dell'umore da visualizzare ancora. Inizia a registrare i tuoi sentimenti!",
    
    // Mood names
    happy: "Felice",
    calm: "Calmo",
    sleepy: "Assonnato",
    thoughtful: "Pensieroso",
    stressed: "Stressato",
    sad: "Triste",
    angry: "Arrabbiato",
    grateful: "Grato",
    excited: "Eccitato",
    neutral: "Neutrale",
    
    // Common
    save: "Salva",
    cancel: "Annulla",
    delete: "Elimina",
    edit: "Modifica",
    close: "Chiudi",
    back: "Indietro"
  }
};

export function useTranslations() {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('appLanguage') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('appLanguage', currentLanguage);
  }, [currentLanguage]);

  const t = (key: string): string => {
    const translation = translations[currentLanguage as keyof typeof translations]?.[key] || 
                       translations.en[key] || 
                       key;
    return translation;
  };

  const changeLanguage = (lang: string) => {
    setCurrentLanguage(lang);
  };

  return {
    t,
    currentLanguage,
    changeLanguage,
    availableLanguages: [
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
      { code: 'es', name: 'Español', flag: '🇪🇸' },
      { code: 'fr', name: 'Français', flag: '🇫🇷' },
      { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
      { code: 'pt', name: 'Português', flag: '🇵🇹' },
      { code: 'it', name: 'Italiano', flag: '🇮🇹' }
    ]
  };
}
