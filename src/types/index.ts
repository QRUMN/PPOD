export interface User {
  id: string;
  name: string;
  accessibilitySettings: AccessibilitySettings;
  progress: Progress;
}

export interface AccessibilitySettings {
  highContrast: boolean;
  fontSize: number;
  voiceCommands: boolean;
  screenReader: boolean;
  signLanguage: boolean;
  reducedMotion: boolean;
}

export interface Progress {
  completedScenarios: string[];
  currentLevel: number;
  safetyScore: number;
}

export interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'voice' | 'system';
  isUserMessage: boolean;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'safety' | 'scam' | 'boundaries' | 'relationships';
  messages: ChatMessage[];
  choices: ScenarioChoice[];
}

export interface ScenarioChoice {
  id: string;
  text: string;
  feedback: string;
  isCorrect: boolean;
  consequences: string[];
}